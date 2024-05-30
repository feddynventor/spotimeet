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
    tour: {
        type: Schema.Types.ObjectId,
        ref: 'Tour',
        required: true,
    },
}));

module.exports = Event;

Event.addMany = async function (events, tour_id) {
    return events
    .map( e => ({
        repo_id: e.id,
        city: e.city,
        date: e.date,
        url: "https://ticketone.it".concat(e.uri),
        tour: tour_id,
    }) )
    .reduce( (acc, e) => acc.then( () => this.findOneAndUpdate({ repo_id: e.repo_id }, e, { new: true, upsert: true }) ), Promise.resolve() )   
}

Event.byCity = async function (city) {
    return this
    // .find({ $text: {$city: city} })  //TODO: text search index
    .find({ city })
    .populate('tour')
}