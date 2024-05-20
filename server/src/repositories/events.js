const axios = require('axios');
const Artist = require('../models/Artist');

module.exports = {
    fetchByArtist: (artist) => axios
        .get(`https://api.fedele.website/ticketone/${artist}?uniqueCity=1`)
        .then( res => {
            return Promise.all(
                res.data.map( async event => ({
                    name: event.name,
                    cover: event.cover,
                    dates: event.dates,
                }) )
            )
        }),
    
    get: async (artist) => {
        return Artist
            .findOne({ name: artist })
            .then( async res => {
                if (res) return artist;
                res = await module.exports.fetchByArtist(artist);
                console.log(res);
            })
    },
}