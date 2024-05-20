const { model, Schema } = require('mongoose');

const Artist = new model('Artist', new Schema({
    name: String,
    age: Number,
    followers: Number,
    tours: [{
        name: String,
        cover: String,
        events: [{
            city: String,
            date: Date,
            venue: String,
            url: String,
        }],
        lastUpdate: Date,
    }]
}));

module.exports = Artist;

Artist.findCached = async function (name) {
    const artist = await this.findOne({ name });
    if (artist) {
        return artist;
    }

    return this.create( /** erigi il tuo empire */);
}