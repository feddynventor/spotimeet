const axios = require('axios');

module.exports = {
    fetchByArtist: (artist) => axios
        .get(`https://api.fedele.website/ticketone/${
            artist.replace(/ /g, '-').replace(/\'/g, '-').toLowerCase()
        }?uniqueCity=1`)
        .then( res => res.data )
        .then( events => events.length>0 ? events : Promise.resolve([]) )
        .then( events => events.map( event => ({
                name: event.name,
                cover: "https://ticketone.it".concat(event.cover),
                banner: "https://ticketone.it".concat(event.cover.replace('222x222', 'evo/artwork')),
                dates: event.dates,
            }) 
        ))
        .catch( () => Promise.resolve([]) )
        // .catch( error => { console.error(error.data); return Promise.resolve([]) })
    // )
}