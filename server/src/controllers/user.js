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
            //.cookie("token", token, { httpOnly: false })
            .status(200)
            .send({token})
        )
        .catch(error => res.status(403).send({error}))
    },
    signUp: async (req, res) => {
        const { username, fullname, email, password } = req.body;
        if (!fullname || !email || !password) return res.status(400).send({error: "Campi mancanti"});
        User.new({
            username: username || email.split('@')[0],
            email,
            password,
            fullname
        })
        .then(auth.jwtPayload)
        .then(token => res
            //.cookie("token", token, { httpOnly: false })
            .status(200)
            .send({token})
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
                .getFavouriteArtists(req.api, req.query.limit)
                .then( artists => Promise.all(
                    artists.map( a => Artist.addToCache(a.uri, a) )
                ))
                .then( artists => User.addFavourites(req.user._id, artists.map( a => a._id )) )
                .then( artists => res.send(artists) )
            : User
                .getDetails(req.user._id, req.query.limit)
                .then( user => user.populate({
                    path: 'favourites',
                    select: '-searchTerm -lastUpdate -tours',
                    options: { sort: { followers: -1 } },
                    limit: req.query.limit || undefined,
                }) )
                .then( user => res.send(user.favourites) )
        )
        .catch( error => res.status(500).send({error}) ),

    addFavouriteArtist: async (req, res) => Artist
        .findOne({ _id: req.body.id })
        // .findOne({ $or: [{_id: req.body.id}, {uri: req.body.id}] })
        .then( artist => artist ? User.addFavourites(req.user._id, [artist._id]) : Promise.reject("Artista non trovato") )
        .then( () => res.sendStatus(200) )
        .catch( error => res.status(500).send({error}) ),

    removeFavouriteArtist: async (req, res) => Artist
        .findOne({ _id: req.body.id })
        .then( artist => artist ? User.removeFavourite(req.user._id, artist._id) : Promise.reject("Artista non trovato") )
        .then( () => !!req.api ? spotify.removeFavouriteArtist(req.api, req.params.id) : Promise.resolve() )
        .then( () => res.sendStatus(200) )
        .catch( error => res.status(500).send({error}) ),
}
