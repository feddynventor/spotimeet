const axios = require('axios');

module.exports = {
    getAccessToken: async (code, redirect_uri) => {
        return axios.post('https://accounts.spotify.com/api/token', {
            code,
            redirect_uri,  // for verification purposes, controllo doppia via spotify
            grant_type: 'authorization_code'
        }, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'authorization': 'Basic ' + (new Buffer.from(process.env.SPTF + ':' + process.env.SPTF_SECRET).toString('base64'))
            }
        }).then( auth => ({
            token: auth.data.access_token,
            refreshToken: auth.data.refresh_token,
            expiresAt: new Date(Date.now() + auth.data.expires_in * 1000)
        }))
    },
    getCurrentUser: async (token) => {
        return axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.data);
    }
}