const axios = require('axios');

module.exports = {
    fetchByArtist: (artist) => axios
        .get(`https://api.fedele.website/ticketone/${
            artist.replace(/ /g, '-').replace(/\'/g, '-').toLowerCase()
        }?uniqueCity=1`)
        .then( res => res.data )
        .then( events => events.length>0 ? events : Promise.resolve([]) )
        .then( events => events.map( event => ({
                name: event.name === "" ? artist : event.name,
                id: event.id,
                url: "https://ticketone.it/".concat(event.uri),
                image: "https://ticketone.it".concat(event.cover),
                dates: event.dates,
            }) 
        ))
        .catch( () => Promise.resolve( [] ) )
}