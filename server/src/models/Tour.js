const { model, Schema } = require('mongoose');
const Event = require('./Event');

const Tour = new model('Tour', new Schema({
    repo_id: {
        type: String,
        unique: true,
    },
    name: String,
    image: String,
    url: String,
}));

module.exports = Tour;

Tour.add = async function (tour) {
    const tour_id = await this.findOneAndUpdate({ repo_id: tour.id }, tour, { new: true, upsert: true }).then((doc) => doc._id)
    return Event.addMany(
        tour.dates,
        tour_id
    )
    .then( () => tour_id )
}