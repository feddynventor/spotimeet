const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt')

const schema = new Schema({
    username: {
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
        bio: String,
        social: [String],
        city: {
            type: String,
            text: true
        }
    },
    oauth: {
        token: String,
        refreshToken: String,
        expiresAt: Date,
    },
    favourites: [{
        type: Schema.Types.ObjectId,
        ref: 'Artist',
    }],
    lastActivity: Date,
    lastUpdate: Date,
});

schema.pre('save', function(next){
    let user = this
    bcrypt.hash(user.passwordHash, 10).then(hash => {user.passwordHash = hash; next()})
})
const User = new model('User', schema)

module.exports = User;

/**
 * this is callable from both plain auth and OAuth
 * @param {*} data fields for the user
 * @returns mongoose user object
 */
User.new = async function (data) {
    return this.create({
        username: data.username ? data.username : data.email.split('@')[0],
        email: data.email,
        passwordHash: data.password,
        profile: {
            displayName: data.fullname || data.display_name,  // display_name is from OAuth spotify
            photo: data.images && data.images.length>0 ? data.images.pop().url : undefined,
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
 * @param {*} uid mongo _id of the user
 * @param {*} data the new oauth data, access token, refresh token and expiration date
 * @returns the new mongo object of the user
 */
User.refreshToken = async function (uid, data) {
    return this.updateOne({
        _id: uid
    }, {
        $set: {
            "oauth": data  // this data is parsed in the repo method
        }
    }, { new: true })
}

/**
 * 
 * @param {String} username username
 * @param {String} email alternative to username
 * @param {String} password possibilmente hashed password in simple SHA256
 * @returns the user object
 */
User.byCredentials = async function (username, email, password) {
    const id = username ? ({username}) : ({email});
    return this.findOne({
        ...id,
    })
    .select("-__v")
    .then(user => {
        if (!user) return Promise.reject('Utente non trovato o combinazione errata');
        if (!bcrypt.compare(password, user.passwordHash)) return Promise.reject('Password errata')
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
        else return this
        .findOneAndUpdate({
            _id: id
        }, {
            $set: { lastActivity: new Date().toISOString() }
        })
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

/**
 * Prende la lista di artisti preferiti dell'utente
 * Questa funzione completa la funzionalita' di gestione dei gruppi
 * only the ids are needed for reference
 * @param {*} uid user object id
 * @param {*} artists array of artist objects
 * @returns rejected promise se update fallisce
 */
User.addFavourites = async function (uid, artist_ids) {
    return this.findOneAndUpdate({
        _id: uid
    }, {
        $addToSet: { favourites: {$each: artist_ids} },
        lastUpdate: new Date().toISOString()
    }, {new: true})
    .populate({
        path: 'favourites',
        options: { sort: {'followers':-1} }
    })
    .then( a => a.favourites )
}

User.getFavourites = async function (uid) {
    return this.findOne({
        _id: uid
    })
    .populate('favourites')
    .select('favourites')
    .then( user => user.favourites )
}

/**
 * Rimuove dai preferiti
 * @param {*} uid user object id
 * @param {*} artist artist object id
 * @returns 
 */
User.removeFavourite = async function (uid, artist_id) {
    return this.updateOne({
        _id: uid
    }, {
        $pull: { favourites: artist_id }
    })
}

/**
 * applica `populate` all'oggetto utente
 * @param {*} uid user object id
 * @returns 
 */
User.getDetails = async function (uid) {
    return this.findOne({
        _id: uid
    })
    .select("-passwordHash -__v -oauth -lastUpdate")
}
