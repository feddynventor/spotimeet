const axios = require('axios');
const jwt = require('jsonwebtoken');
const spotifyRepository = require('../repositories/spotify_oauth');
const User = require('../models/User');
const Group = require('../models/Group');

module.exports = {
    /**
     * 
     * @param {*} user mongo user object
     * @returns parsed JWT token
     */
    jwtPayload: user => jwt.sign({
            id: user._id,
            // username: user.username ? user.username : user.profile.displayName ? user.profile.displayName.replace(" ","-").toLowerCase() : user.id,
            // fullname: user.profile.displayName,
            // email: user.email,
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

                console.log("AUTHENTICATED", user.oauth.expiresAt, user.email)
                if (!!user.oauth.token) {  // QUERY RITORNA OGGETTO HYDRATED
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
    /**
     * verifica formato JWT
     * controlla se esiste utente con ID passato tra gli header della connessione assieme a HTTP 101
     * se esiste, controlla se appartiene al gruppo indicato
     * @param {*} sock verra' arricchito con user e group
     * @param {*} next 
     * @returns 
     */
    authenticateSocket: (sock, next) => {
        // parse cookie from handshake in format token=xxxxx
        if (sock.request.headers.cookie === undefined) return sock.emit('exception', { error: "Token di autenticazione mancante" });
        if (sock.handshake.query.group === undefined) return sock.emit('exception', { error: "Parametro gruppo mancante" });

        const regex = sock.request.headers.cookie.match(/token=[^;]+/)
        if (!!!regex) return sock.emit('exception', { error: "Token di autenticazione mancante" });
        const token = regex[0].split('=')[1]

        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) return sock.emit('exception', { error: "Token di autenticazione non valido" });
            else User
            .byIdentifier(payload.id)
            .then( async user => {
                if (!user) return sock.emit('exception', { error: "Utente non trovato" });
                // else
                console.log("CONNECTED", user.oauth.expiresAt, user.email)
                sock.user = user;
                if (!!user.oauth.token) {  // QUERY RITORNA OGGETTO HYDRATED
                    if (user.oauth.expiresAt < new Date()) await spotifyRepository
                        .refreshToken(user.oauth.refreshToken)
                        .then( auth => User.refreshToken(user._id, auth) )
                        // .then( (err, doc) => { user = doc } )  // update local object  // TODO: check if needed, as the access token have been refreshed
                        .catch( error => res.status(401).send({ error }) );

                    sock.api = axios.create({
                        baseURL: 'https://api.spotify.com/v1',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + user.oauth.token
                        }
                    });
                }
                return Group
                .findOne({
                    _id: sock.handshake.query.group,
                    members: { $in: [user._id] }
                })
            })
            .then( group => {
                if (!group) return sock.emit('exception', { error: "Non sei un membro del gruppo" });
                // else
                sock.join(group._id);  // restringe il broadcast dei messaggi al gruppo
                sock.to(group._id).emit('message', { status: `${sock.user.profile.displayName} è online` });

                sock.group = group;
                next();
            })
            .catch( error => sock.emit('exception', { error }) ); // TODO: check if needed
        });
    }
}
