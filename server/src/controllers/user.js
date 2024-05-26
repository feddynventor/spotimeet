const User = require('../models/User');
const Artist = require('../models/Artist');

const auth = require('../middlewares/auth');
const spotify = require('../repositories/spotify_api');

module.exports = {
    login: async (req, res) => {
        const { name, email, password } = req.body;
        User
        .byCredentials(name, email, password)
        .then(auth.jwtPayload)
        .then(token => res.send({ token }))
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
        .then(token => res.send({ token }))
        .catch(error => res.status(403).send({error}))
    },
    tokenInfo: async (req, res) => res.send(req.user),
    me: async (req, res) => req.api
        .get('/me')
        .then( user => res.send(user.data) )
        .catch( error => res.status(500).send({error}) ),
    getFavouritesArtists: async (req, res) => spotify
        .getMyFavouriteArtists(req.api)
        .then( artists => {
            res.send(artists)
            return artists
        })
        .then( async artists => Promise.all(
            artists.map( a => Artist.addToCache(a.uri, a) )
        ))
        // .catch( error => res.status(500).send({error}) ),
}