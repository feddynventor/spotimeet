const { model, Schema } = require('mongoose');

const Event = new model('Event', new Schema({
    repo_id: {
        type: String,
        unique: true,
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

Event.addMany = async function (artist, tour) {
    return tour.dates
    .map( e => ({
        repo_id: e.id,
        city: e.city,
        date: e.date,
        url: "https://ticketone.it".concat(e.uri),
        tour: tour.id,  //API id
        artist: artist._id,  //object id
    }) )
    .reduce( (acc, e) => acc.then(
        () => this.findOneAndUpdate({ repo_id: e.repo_id }, e, { new: true, upsert: true })
    ), Promise.resolve() )
    .then( () => this.find({ tour: tour.id }) )
}

Event.byCity = async function (city) {
    return this
    // .find({ $text: {$city: city} })  //TODO: text search index
    .find({ city })
    .populate('tour')
}