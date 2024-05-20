const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    jwtPayload: user => jwt.sign({
            id: user.id,
            username: user.name,
            fullname: user.profile.displayName,
            email: user.email,
        }, process.env.JWT_SECRET
    ),
    authenticateToken: (req, res, next) => {
        const token = req.cookies['token'];
        if (!token) return res.status(403).send({ error: "Token di autorizzazione mancante" });  // redirect to home or login

        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) return res.status(401).send({ error: "Token di autorizzazione non valido" });
            else User
            .byIdentifier(payload.id)
            .then(user => {
                if (!user) return res.sendStatus(401);
                req.user = user;
                if (!!user.oauth) req.api = axios.create({
                    baseURL: 'https://api.spotify.com/v1',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.oauth.token
                    }
                });
                next();
            })
            .catch( error => res.status(401).send({ error }) );
        });
    },
}