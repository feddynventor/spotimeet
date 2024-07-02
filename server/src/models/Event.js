const { model, Schema } = require('mongoose');

const Event = new model('Event', new Schema({
    repo_id: {
        type: String,
        unique: true
    },
    city: {
        type: String,
        index: true,
        text: true,
    },
    date: Date,
    url: String,
    tour: String,
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
    },
}));

module.exports = Event;

/**
 * Aggiunge all'Event fetchato da API, il tour e Artist corrispondente
 * avendo cosi' le due chiavi esterne
 * Poi aggiungi al DB ogni singolo evento
 * ogni query viene eseguita in sequenza
 * Infine ritorna tutti gli eventi dello stesso tour
 */
Event.addMany = async function (artist, tour) {
    return tour.dates
    .map( e => ({
        repo_id: e.id,
        city: e.city,
        date: e.date,
        url: "https://ticketone.it"+e.uri,
        tour: tour.id,  //API id, non creiamo il modello dati per Tour
        artist: artist._id,  //object id
    }) )
    .reduce( (acc, e) => acc.then(
        () => this.findOneAndUpdate({ repo_id: e.repo_id }, e, { new: true, upsert: true })
    ), Promise.resolve() )
    .then( () => this.find({ tour: tour.id }) )
}

/**
 * Partial text search per le citta' di tutti gli eventi
 */
Event.byCity = async function (city) {
    return this
    .find({ city: new RegExp(city, "gi") })
    .populate('artist')
}
