const User = require('../models/User');
const Artist = require('../models/Artist');

const auth = require('../middlewares/auth');
const spotify = require('../repositories/spotify_api');

const checkExpired = date => !date || new Date((new Date(date)).getTime() + 24*60*60*1000) < new Date();

module.exports = {
    login: async (req, res) => {
        const { username, email, password } = req.body;
        User
        .byCredentials(username, email, password)
        .then(auth.jwtPayload)
        .then(token => res
            .cookie("token", token, { httpOnly: true })
            .redirect('/')
        )
        .catch(error => res.status(403).send({error}))
    },
    signUp: async (req, res) => {
        const { username, fullname, email, password } = req.body;
        if (!fullname || !email || !password) return res.status(400).send({error: "Campi mancanti"});
        User.new({
            username,
            email,
            password,
            fullname
        })
        .then(auth.jwtPayload)
        .then(token => res
            .cookie("token", token, { httpOnly: true })
            .redirect('/')
        )
        .catch(error => res.status(403).send({error}))
    },
    tokenInfo: async (req, res) => res.send(req.user),
    me: async (req, res) => User
        .getDetails(req.user._id)
        .then( user => res.send(user) )
        .catch( error => res.status(404).send({error}) ),
    getFavouriteArtists: async (req, res) => ( (checkExpired(req.user.lastUpdate) || !!req.query.all) && !!req.api
            ? spotify
                .getFavouriteArtists(req.api)
                .then( artists => {
                    res.send(artists)
                    return artists
                })
                .then( artists => Promise.all(
                    artists.map( a => Artist.addToCache(a.uri, a) )
                ))
                .then( artists => User.addFavourites(req.user._id, artists) )
            : User
                .getFavourites(req.user._id)
                .then( artists => res.send(artists) )
        ),
        // .catch( error => res.status(500).send({error}) ),
    removeFavouriteArtist: async (req, res) => Artist
        .findOne({ uri: req.params.id })
        .then( object_id => User.removeFavourite(req.user._id, object_id) )
        .then( () => !!req.api ? spotify.removeFavouriteArtist(req.api, req.params.id) : Promise.resolve() )
        .then( () => res.sendStatus(200) )
        // .catch( error => res.status(500).send({error}) ),
}