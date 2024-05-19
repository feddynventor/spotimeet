const { model, Schema } = require('mongoose');

const Artist = new model('Artist', new Schema({
    name: String,
    age: Number,
    followers: Number,
    events: [{
        name: String,
        date: Date,
        location: String,
    }]
}));


Artist.findCached = async function (name) {
    const artist = await this.findOne({ name });
    if (artist) {
        return artist;
    }

    return this.create( /** erigi il tuo empire */);
}

module.exports = Artist