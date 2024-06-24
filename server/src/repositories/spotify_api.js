
const artistSchema = artist => ({
    name: artist.name,
    uri: artist.id,
    image: artist.images.length > 0 ? artist.images[0].url : null,
    url: artist.external_urls ? artist.external_urls.spotify : null,
    followers: artist.followers ? artist.followers.total : null,
})

module.exports = {
    searchArtist: (api, query) => {
        return api
        .get(`/search?q=${query}&market=IT&limit=7&type=artist`)
        .then( res => {
            if (res.data.artists.total === 0) return Promise.reject('Nessun artista trovato');
            else return res.data.artists.items.map( artistSchema )
        })
    },
    getArtist: (api, id) => {
        return api
        .get(`/artists/${id}`)
        .then( res => artistSchema(res.data) )
    },
    getFavouriteArtists: (api, limit) => {
        return api
        .get(`/me/following?type=artist&limit=${limit}`)
        .then( res => res.data.artists.items.map( artistSchema ))
    },
    removeFavouriteArtist: (api, id) => {
        return api
        .delete(`/me/following?type=artist&ids=${id}`)
        .then( res => res.status === 204 ? Promise.resolve() : Promise.reject(res.data) )
    }
}
