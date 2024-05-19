const axios = require('axios');
const Artist = require('../models/Artist');

module.exports = {
    fetchByArtist: (artist) => axios
        .get(`https://api.fedele.website/ticketone/${artist}`)
        .then( res => res.data ),
    
    get: async (artist) => {
        return Artist
            .findOne({ name: artist })
            .then( async res => {
                if (res) return artist;
                const data = await module.exports.fetchByArtist(artist);
                console.log(data);
            })
    },
}