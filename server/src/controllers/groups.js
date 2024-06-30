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
        .then( ()=>{ User.addFavourites(req.user._id, [artist]) } )
        .catch( error => res.status(500).send({error}) )
    },
    /**
     * passato ID documento evento
     * @returns oggetto gruppo, con tour popolato
     */
    joinEvent: async (req, res) => {
        const { event } = req.params;
        const artist = await Event.findOne({ _id: event }).select('artist').populate('artist').then( a => a.artist)
        console.log(artist.tours)
        if (!artist) return res.status(404).send({error: "Evento non trovato"})
        return Group
        .join(artist._id, event, req.user._id)
        .then( group => res.send({
            ...group,
            event: {
                ...group.event._doc,
                tour: artist.tours.filter( t => t.repo_id == group.event.tour )[0]
            }
        }) )
        .then( ()=>{ User.addFavourites(req.user._id, [artist._id]) } )
        .catch( error => res.status(500).send({error}) )
    },

    byCity: async (req, res) => {
        return Event
        .byCity(req.query.q)
        .then( events => events.length==0 ? Promise.reject("Nessun evento trovato") : events )
        .then( events => Promise.all(events.map( async e => {
            const g = await Group.getBy(e.artist._id, e._id) 
            if (g) return g
            else return { _id: null, event: {...e._doc, artist: undefined}, artist: {...e._doc.artist._doc, tours: undefined} }
        }) ))
        .then( groups => res.send(groups) )
        .catch( error => res.status(500).send({error}) )
    },
    byArtist: async (req, res) => {
        const { artist } = req.params;
        return Artist
        .findOne({ _id: artist })
        .select('-searchTerm -lastUpdate')
        .then( artist => {
            if (!artist) return Promise.reject("Artista non trovato")
            return artist
        })
        .then( async artist => ({
                ...artist._doc,
                tours: await Promise.all(artist._doc.tours.map( async t => ({
                    ...t._doc,
                    events: await Event
                        .find({ tour: t._doc.repo_id, date: { $gte: new Date() } })
                        .select('city date url')
                        .sort('date')
                        .then( events => Promise.all(events.map( async e => ({
                            ...e._doc,
                            isMember: await Group.attendingEvent(e._doc._id, req.user._id)
                        }))))
                })))
        }) )
        .then( artist => res.send(artist) )
        .catch( error => res.status(500).send({error}) )
    },

    favourites: async (req, res) => {
        const artists_ids = await User
        .getFavourites(req.user._id)
        return Artist
        .find({ _id: {$in: artists_ids} })
        .select('-searchTerm -lastUpdate')
        .then( artists => Promise.all(artists.map( async a => ({
            ...a._doc,
            tours: await Promise.all(a.tours.map( async t => ({
                ...t._doc,
                events: await Event.find({ tour: t.repo_id }).sort('date')
            })))
        }))) )
        .then( groups => res.send(groups) )
        .catch( error => res.status(500).send({error}) )
    },

    getJoined: async (req, res) => {
        return Group
        .joined(req.user._id)
        .then( groups => res.send(groups) )
        .catch( error => res.status(500).send({error}) )
    },
    getTop10: async (req, res) => {
        return Group
        .top10()
        .then( groups => res.send(groups) )
        .catch( error => res.status(500).send({error}) )
    }
}
