const { model, Schema } = require('mongoose');

const Artist = new model('Artist', new Schema({
    name: {
        type: String,
        index: true,
        text: true,
    },
    uri: {
        type: String,
        unique: true,
        index: true,
    },
    followers: Number,
    image: String,
    url: String,
    searchTerm: {
        type: [String],
        index: true,
    },
    tours: [{
        name: String,
        cover: String,
        dates: [{
            city: String,
            date: Date,
            venue: String,
            url: String,
        }],
    }],
    lastUpdate: Date
}));

module.exports = Artist;

/**
 * Cerca nel DB tramite query testuale o controllando precedenti termini di ricerca
 * @param {} name 
 * @returns docs
 */
Artist.searchCache = async function (name) {
    return this
    .find({ $or: [{ $text: {$search: name} }, { searchTerm: {"$in": [name]} }] })
}

/**
 * Trova il record e aggiorna l'oggetto tours e la data di effettivo fetch
 * È più lenta ma opera transazione per ottenere il doc aggiornato
 * @param {} id 
 * @param {*} tours 
 * @returns 
 */
Artist.updateTours = async function (id, tours) {
    return this
    .findByIdAndUpdate(
        id, 
        { tours, lastUpdate: new Date().toISOString() },
        { returnDocument: 'after' }
    )
}

/**
 * Aggiunge un artista al DB, se non esiste, 
 * o aggiorna il record con un nuovo termine di ricerca e eventuali nuove proprieta'
 * @param {*} uri campo unico del modello
 * @param {*} artist oggetto documento
 * @param {*} query testo utilizzato per la ricerca, sia per spotify che per query al DB
 * @returns il doc utilizzato per l'aggiornamento `returnDocument: 'before'`
 */
Artist.addToCache = async function (uri, artist, query) {
    const obj = query ? {...artist, searchTerm: [query]} : artist
    return this
    .findOne({ uri })
    .then( async doc => {
        if (!doc) return this.create(obj)
        else {
            await this.updateOne({ uri }, artist)
            if (!!query && doc.searchTerm.includes(query)) return doc
            await this.updateOne({ uri }, { $push: { searchTerm: query } })
            return doc
        }
    })
}