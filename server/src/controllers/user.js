const User = require('../models/User');
const Artist = require('../models/Artist');

const auth = require('../middlewares/auth');
const spotify = require('../repositories/spotify_api');

const checkExpired = date => !date || new Date((new Date(date)).getTime() + 24*60*60*1000) < new Date();

module.exports = {
    login: async (req, res) => {
        const { name, email, password } = req.body;
        User
        .byCredentials(name, email, password)
        .then(auth.jwtPayload)
        .then(token => res
            .cookie("token", token, { httpOnly: true })
            .status(301)
            .redirect('/')
        )
        .then(token => {
            module.exports.getFavouriteArtists(req, res)
        })
        .catch(error => res.status(403).send({error}))
    },
    signUp: async (req, res) => {
        const { name, fullname, email, password } = req.body;
        User.new({
            id: name,
            email,
            password,
            profile: { display_name: fullname }
        })
        .then(auth.jwtPayload)
        .then(token => res
            .cookie("token", token, { httpOnly: true })
            .status(301)
            .redirect('/')
        )
        .catch(error => res.status(403).send({error}))
    },
    tokenInfo: async (req, res) => res.send(req.user),
    me: async (req, res) => User
        .getDetails(req.user._id)
        .then( user => res.send(user) )
        .catch( error => res.status(404).send({error}) ),
    getFavouriteArtists: async (req, res) => ( (checkExpired(req.user.lastUpdate) || !!req.query.all)
            ? spotify
                .getFavouriteArtists(req.api)
                .then( artists => {
                    res.send(
                        artists.map( a => ({
                            subscribed: false,
                            artist: a
                        }))
                    )
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
    removeFavouriteArtist: async (req, res) => spotify
        .removeFavouriteArtist(req.api, req.params.id)
        .then( () => Artist.findOne({ uri: req.params.id }) )
        .then( object_id => User.removeFavourite(req.user._id, object_id) )
        .then( () => res.sendStatus(200) )
        // .catch( error => res.status(500).send({error}) ),
}