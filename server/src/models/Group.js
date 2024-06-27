const { model, Schema } = require('mongoose');

const Group = new model('Group', new Schema({
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        validate: {
            validator: async function (artist_id) {
                if (!!!artist_id) return
                return await this.model('Artist').exists({ _id: artist_id });
            },
            message: 'Artista non trovato',
        }
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        validate: {
            validator: async function (event_id) {
                if (!!!event_id) return
                else return await this.model('Event').exists({ _id: event_id });
            },
            message: 'Data evento non trovata',
        }
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
    }],
}))

module.exports = Group;

Group.join = async function (artist_id, event_id, user_id) {
    return this.findOneAndUpdate({
        artist: artist_id,
        event: event_id,
    }, {
        $addToSet: { members: user_id },
    }, {
        new: true,
        upsert: true,
    })
    .select('-messages')
    .populate({
        path: 'event',
        select: '-artist -repo_id',
    })
    .populate({
        path: 'artist',
        select: '-searchTerm -lastUpdate -tours',
    })
    .then( async doc => {
        if (!doc) return Promise.reject("Artista non trovato")
        await doc.validate()   // la validazione avviene post inserimento
        return doc
    })
    .then( g => ({...g._doc, members: g._doc.members.length}) )
    .catch( async error => {
        await this.deleteOne({ // rollback manuale
            artist: artist_id,
            event: event_id,
        })
        return Promise.reject({error: error._message}) //validation error message
    })
}

Group.getBy = async function (artist_id, event_id) {
    return commonOp( this.findOne({
        artist: artist_id,
        event: event_id,
    }) )
}

Group.getMessages = async function (group_doc_id) {
    return this.findOne({
        _id: group_doc_id,
    })
    .populate({
	path: 'messages',
	perDocumentLimit: 30, //limite superiore
        options: {
            sort: {'timestamp': -1},  //necessario per limitare alle ultime 30 voci
        },
	populate: {
            path: 'user',
            select: '_id profile'
	}
    })
    .catch( error => Promise.reject(error.message) )
}

/**
 * Controlla se si e' membro del gruppo specificato
 */
Group.attendingEvent = async function (event_id, uid) {
    return this
        .findOne({
            event: event_id,
            members: { $in: [uid] }
        })
        .then( group => group!==null)
}

/**
 * Lista i gruppi a cui l'utente specificato e' unito
 */
Group.joined = async function (uid) {
    return commonOp( this.find({ members: uid }) )
}

/**
 * Lista i gruppi top
 */
Group.top10 = async function (uid) {
    return commonOp( this.find({}) )
        .then( groups => groups.sort( (a, b) => b.members - a.members ) )
        .then( groups => groups.slice(0, 10) )
}

const commonOp = (query) => query
    .select('-messages')
    .populate({
        path: 'event',
        select: 'city date url',
    })
    .populate({
        path: 'artist',
        select: '-searchTerm -lastUpdate -tours',
    })
    .then( groups => groups.map( g => ({...g._doc, members: g._doc.members.length}) ) )
