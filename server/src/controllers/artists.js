const Artist = require('../models/Artist');
const spotify = require('../repositories/spotify_api');
const events = require('../repositories/events');  // no Model for events

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
        (req.query.all 
            ? spotify.searchArtist(req.api, name) 
            : Artist.searchCache(name)
                .then( artists => artists.length>0 
                    ? artists 
                    : spotify
                        .searchArtist(req.api, name)
                        .then(artists => Promise.all(artists.map( 
                            a => Artist.addToCache(a.uri, a, name)
                        )))
                    )
        )
        .then( artists => {
            if (artists.length === 0) return Promise.reject({code: 404, message: "Artista non trovato"})
            res.send(artists)  // invia immediatamente lista di artisti
            return artists
        } )
        // fuori dal ciclo req-res per evitare timeout, dovuto a fetchByArtist
        // aggiorna solo almeno una volta ogni 24h
        .then( artists => Promise.all(artists.map( 
            async a => checkExpired(a.lastUpdate)
                ? Artist.updateTours(a._id, await events.fetchByArtist(a.name))
                : a
        )) )
        .catch( err => err.code === 11000 ? Promise.resolve() : res.status(404).send(err) )
    },
    /**
     * Si specifica l'ID di spotify dell'artista nell'URI
     * Si cerca nel DB, se non presente si cerca su spotify e si aggiunge alla cache
     * (il flusso di utilizzo sul frontend non vedra' mai un artista non presente in cache)
     * Vengono richiesti i tours se la data di ultimo aggiornamento e' troppo indietro, altrimenti ritorna cache
     * TODO: sarebbe l'ideale triggerare un aggiornamento intorno a mezzanotte (attenzione overload, specifica ulteriore)
     * Se viene specificato il parametro `all` si aggiornano i tours comunque
     */
    get: (req, res) => {
        const { id } = req.params;
        if (!id) return res.status(400).send({error: 'Specifica un artista'});
        Artist
        .findOne({ uri: "spotify:artist:".concat(id) })
        .then( artist => artist 
            ? artist 
            : spotify
                .getArtist(req.api, id)
                .then( a=> Artist.addToCache(a.uri, a)) )
        .then( async artist => {
            if (checkExpired(artist.lastUpdate) || !!!req.params.all) return Artist.updateTours(artist._id, await events.fetchByArtist(artist.name))
            else return artist
        } )
        .then( artist => res.send(artist) )
        .catch( err => res.status(404).send({error: err}) )
    },
}