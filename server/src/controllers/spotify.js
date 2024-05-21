const spotifyRepository = require('../repositories/spotify');
const User = require('../models/User');
const auth = require('../middlewares/auth');

module.exports = {
    /**
     * user spotify login form
     */
    spotifyOAuth: (req, res) => {
        res.redirect(
            'https://accounts.spotify.com/authorize?' +
            new URLSearchParams({
                response_type: 'code',
                client_id: process.env.SPTF,
                scope: 'user-read-private user-read-email user-read-currently-playing playlist-read-private user-library-read',
                redirect_uri: `http://${req.headers.host}/login/oauth/complete`,
                // state: '123'  //custom field passed to callback
            })
        );
    },
    /**
     * exchange the authorization code for an access token
     */
    callback: async (req, res) => {
        if (req.query.code === null) {
            res.redirect('/login?error=auth_failed');  // TODO: user credentials side error
        } else {
            const { token, refreshToken, expiresAt } = await spotifyRepository
            .getAccessToken(req.query.code, `http://${req.headers.host}/login/oauth/complete`)
            .catch( err => res.status(403).send({error: err.message}) );

            if (token) spotifyRepository
                .tokenToUser(token)
                // verify if user is already signed up, the user is already verified by spotify
                .then( user => User
                    .byMail(user.email)
                    .catch(() => Promise.resolve(
                            User.new({
                                ...user,
                                oauth: { token, refreshToken, expiresAt }
                            })
                        )
                    )
                )
                .then(auth.jwtPayload)
                .then(token => res.send({ token }))
                .catch(error => res.status(403).send({error}))
            else 
                res.status(403).send({error: 'Spotify non ha risposto correttamente'});
        }
    }
}