const { model, Schema } = require('mongoose');

const User = new model('User', new Schema({
    name: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    passwordHash: String,
    profile: {
        displayName: String,
        photo: String,
        url: String,
    },
    oauth: {
        token: String,
        refreshToken: String,
        expiresAt: Date,
    },
    // events: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Event',
    // }],
}));

module.exports = User;

/**
 * this is callable from both plain auth and OAuth
 * @param {*} data fields for the user
 * @returns mongoose user object
 */
User.new = async function (data) {
    return this.create({
        username: data.id,
        email: data.email,
        passwordHash: data.password,
        profile: {
            displayName: data.display_name,
            photo: data.images ? data.images[0] : undefined,
            url: data.external_urls ? data.external_urls.spotify : undefined,
        },
        oauth: data.oauth
    })
    .then(doc => doc.save())
    .catch(err => Promise.reject( 
        err.errorResponse.code === 11000 ? "Utente gia' esistente"
        : err.errorResponse
    ));
}

/**
 * 
 * @param {String} name username
 * @param {String} email alternative to username
 * @param {String} password hashed password in simple SHA256
 * @returns the user object
 */
User.byCredentials = async function (username, email, password) {
    const id = username ? ({name: username}) : ({email});
    return this.findOne({
        ...id,
        passwordHash: password
    })
    .select("-passwordHash -__v")
    .then(user => {
        if (!user) return Promise.reject('Utente non trovato o combinazione errata');
        else return user;
    })
}

/**
 * mainly used for authentication
 * @param {*} id mongo id
 * @returns the user object
 */
User.byIdentifier = async function (id) {
    return this.findOne({
        _id: id
    })
    .select("-passwordHash -__v")
    .then(user => {
        if (!user) return Promise.reject('Utente non trovato');
        else return user;
    })
}

/**
 * mainly used for OAuth
 * @param {*} email
 * @returns the user object
 */
User.byMail = async function (email) {
    return this.findOne({
        email
    })
    .select("-passwordHash -__v")
    .then(user => {
        if (!user) return Promise.reject('Utente non trovato');
        else return user;
    })

}