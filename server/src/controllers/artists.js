const Artist = require('../models/Artist');
const Event = require('../models/Event');
const spotify = require('../repositories/spotify_api');
const events_repo = require('../repositories/events');  // no Model for events

const checkExpired = date => !date || new Date((new Date(date)).getTime() + 24*60*60*1000) < new Date();

module.exports = {
    /**
     * Si basa sul parametro testuale q `query`
     * Se viene specificato il parametro `all` cerca anche in remoto su spotify
     * TODO: alcuni dati dinamici (eg.followers) sarebbero aggiornati nella cache solo qualora arrivasse una richiesta con modificatore `all`
     * In tutti i casi si aggiorna la cache, assieme al termine di ricerca
     * Si termina il ciclo di richiesta-risposta inviando la lista di artisti
     * Nel mentre si aggiornano i tour degli artisti, se necessario (almeno una volta al giorno)
     * I tour saranno salvati nel DB, ipoteticamente pronti per la richiesta al singolo artista tramite `get`
     */
    search: (req, res) => {
        const name = req.query.q;
        if (!name) return res.status(400).send({error: 'Specifica un artista'});
        Artist
        .searchCache(name)
        .then( artists => artists.length==0 && !!req.api
            ? spotify
                .searchArtist(req.api, name)
                .then(artists => Promise.all(artists.map( 
                    a => Artist.addToCache(a.uri, a, name)
                )))
            : artists
            )
        .then( artists => {
            if (artists.length === 0) return Promise.reject({code: 404, message: "Artista non trovato"})
            res.send(artists)  // invia immediatamente lista di artisti
            return artists
        } )
        // fuori dal ciclo req-res per evitare timeout, dovuto a fetchByArtist
        // aggiorna solo almeno una volta ogni 24h
        .then( artists => Promise.all(artists.map( 
            // Artista sicuramente in cache, posso usare il document _id
            async a => checkExpired(a.lastUpdate)
                ? new Promise( async () => {
                    const events = await events_repo.fetchByArtist(a.name)
                    return Promise
                        .all(events.map( t => Event.addMany(a, t) ))
                        .then( () => Artist.updateTours(a._id, events) )
                })
                : null
        )) )
        .catch( err => err.code === 11000 ? Promise.resolve() : res.status(404).send(err) )
    },
    /**
     * Si specifica l'ID di spotify dell'artista nell'URI
     * Si cerca nel DB, se non presente si cerca su spotify e si aggiunge alla cache
     * (il flusso di utilizzo sul frontend non vedra' mai un artista non presente in cache)
     * Nel caso di GET è bene ritornare un dato aggiornato riguardo i tours, quindi non inviando direttamente la risposta dalla cache,
     * bensì rallentare la risposta per attendere l'aggiornamento dei tours
     * Vengono richiesti i tours se la data di ultimo aggiornamento e' troppo indietro, altrimenti ritorna cache
     * TODO: sarebbe l'ideale triggerare un aggiornamento intorno a mezzanotte (attenzione overload, specifica ulteriore)
     * Se viene specificato il parametro `all` si aggiornano i tours comunque
     */
    get: (req, res) => {
        const { id } = req.params;
        if (!id) return res.status(400).send({error: 'Specifica un artista'});
        Artist
        .get(id)
        .then( artist => !!req.api && (!artist || checkExpired(artist.lastUpdate) || !!req.api && !!req.query.all)
            ? spotify
                .getArtist(req.api, id)
                .then( a=> Artist.addToCache(a.uri, a))
            : artist
            )
        .then( async a => {
            if (!a) return Promise.reject("Non trovato")
            // Artista sicuramente in cache, posso usare il document _id
            if (checkExpired(a.lastUpdate) || !!req.query.all){ //`all` consente anche un fetch sulle api di ticketone
                const events = await events_repo.fetchByArtist(a.name)
                await Promise
                    .all(events.map( t => Event.addMany(a, t) ))
                    .then( () => Artist.updateTours(a._id, events) )
            }
            return a
        } )
        .then( artist => res.send(artist) )
        .catch( error => res.status(404).send({error}) )
    },
}