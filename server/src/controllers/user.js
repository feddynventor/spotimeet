const User = require('../models/User');
const auth = require('../middlewares/auth');

module.exports = {
    login: async (req, res) => {
        const { name, email, password } = req.body;
        User
        .byCredentials(name, email, password)
        .then(auth.jwtPayload)
        .then(token => res.send({ token }))
        .catch(error => res.status(403).send({error}))
    },
    signUp: async (req, res) => {
        const { name, fullname, email, password } = req.body;
        User.new({
            id: name,
            email,
            password,
            profile: { displayName: fullname }
        })
        .then(auth.jwtPayload)
        .then(token => res.send({ token }))
        .catch(error => res.status(403).send({error}))
    },
    me: async (req, res) => res.send(req.user)
}