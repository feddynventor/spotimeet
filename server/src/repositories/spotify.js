const axios = require('axios');

module.exports = {
    getAccessToken: async (code, redirect_uri) => axios({
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            data: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(process.env.SPTF + ':' + process.env.SPTF_SECRET).toString('base64'))
            },
            json: true
        }).then( auth => ({
            token: auth.data.access_token,
            refreshToken: auth.data.refresh_token,
            expiresAt: new Date(Date.now() + auth.data.expires_in * 1000)
        })),
    tokenToUser: async (token) => axios
        .get('https://api.spotify.com/v1/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.data)
        /**
         * {
            "display_name" : "allerta12",
            "external_urls" : {
                "spotify" : "https://open.spotify.com/user/allerta12"
            },
            "href" : "https://api.spotify.com/v1/users/allerta12",
            "id" : "allerta12",
            "images" : [ ],
            "type" : "user",
            "uri" : "spotify:user:allerta12",
            "followers" : {
                "href" : null,
                "total" : 0
            },
            "country" : "IT",
            "product" : "free",
            "explicit_content" : {
                "filter_enabled" : false,
                "filter_locked" : false
            },
            "email" : "allerta12@gmail.com"
            }
         */
}