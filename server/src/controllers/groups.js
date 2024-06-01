const Group = require('../models/Group');
const User = require('../models/User');
const Event = require('../models/Event');
const Artist = require('../models/Artist');

module.exports = {
    /**
     * passato ID documento artista
     * @returns oggetto gruppo
     */
    joinArtist: async (req, res) => {
        const { artist } = req.params;
        return Group
        .join(artist, null, req.user._id)
        .then( group => res.send(group) )
        .catch( error => res.status(500).send({error}) )
    },
    /**
     * passato ID documento evento
     * @returns oggetto gruppo, con tour popolato
     */
    joinEvent: async (req, res) => {
        const { event } = req.params;
        await Group
        .join(null, event, req.user._id)
        .then( group => res.send(group) )
        .catch( error => res.status(500).send({error}) )
    },

    byCity: async (req, res) => {
        const { city } = req.params;
        return Event
        .byCity(city)
        .then( groups => res.send(groups) )
        .catch( error => res.status(500).send({error}) )
    },
    byArtist: async (req, res) => {
        const { artist } = req.params;
        return Artist
        .findOne({ _id: artist })
        .populate('tours')
        .select('tours')
        .then( artist => artist.tours )
        .then( tours => Promise.all(tours.map( async t => ({
            ...t._doc,
            events: await Event.find({ tour: t }).sort('date')
        }))))
        .then( groups => res.send(groups) )
        .catch( error => res.status(500).send({error}) )
    },
    favourites: async (req, res) => {
        const artists_ids = await User
        .getFavourites(req.user._id)
        .then( favourites => favourites.map(f => f.artist._id) )
        return Artist
        .find({ _id: {$in: artists_ids} })
        .populate('tours')
        .select('tours')
        .then( artist => artist.filter( a => a.tours.length > 0).map( a => a.tours ).flat() )  // mescola tutti gli eventi di ogni artista in 1
        .then( tours => Promise.all(tours.map( async t => ({
            ...t._doc,
            events: await Event.find({ tour: t }).sort('date')
        }))))
        .then( groups => res.send(groups) )
        .catch( error => res.status(500).send({error}) )
    },

    getEventGroup: async (req, res) => {
        const { event } = req.params;
        return Group
        .getEvent(event)
        .then( group => res.send(group) )
        .catch( error => res.status(500).send({error}) )
    },
    getArtistGroup: async (req, res) => {
        const { artist } = req.params;
        return Group
        .getGlobal(artist)
        .then( groups => res.send(groups) )
        .catch( error => res.status(500).send({error}) )
    }
}