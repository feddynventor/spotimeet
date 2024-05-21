const axios = require('axios');
const jwt = require('jsonwebtoken');
const spotifyRepository = require('../repositories/spotify');
const User = require('../models/User');

module.exports = {
    /**
     * 
     * @param {*} user mongo user object
     * @returns parsed JWT token
     */
    jwtPayload: user => jwt.sign({
            id: user._id,
            username: user.name,
            fullname: user.profile.displayName,
            email: user.email,
        }, process.env.JWT_SECRET
    ),
    /**
     * check if user exists, then store its object in req.user
     * if user has oauth data, create an axios instance for the api
     * @returns 
     */
    authenticateToken: (req, res, next) => {
        const token = !!req.cookies['token'] ? req.cookies['token'] : req.headers['authorization']
        if (!token) return res.status(403).send({ error: "Token di autorizzazione mancante" });  // redirect to home or login

        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) return res.status(401).send({ error: "Token di autorizzazione non valido" });
            else User
            .byIdentifier(payload.id)
            .then( async user => {
                if (!user) return res.sendStatus(401);

                console.log("AUTHENTICATED", user)
                if (!!user.oauth) {
                    if (user.oauth.expiresAt < new Date()) await spotifyRepository
                        .refreshToken(user.oauth.refreshToken)
                        .then( auth => User.refreshToken(user._id, auth) )
                        // .then( (err, doc) => { user = doc } )  // update local object  // TODO: check if needed, as the access token have been refreshed
                        .catch( error => res.status(401).send({ error }) );

                    req.api = axios.create({
                        baseURL: 'https://api.spotify.com/v1',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + user.oauth.token
                        }
                    });
                }
                req.user = user;
                next();
            })
            .catch( error => res.status(401).send({ error }) ); // TODO: check if needed
        });
    },
}