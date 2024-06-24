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
    .then( async doc => {
        await doc.validate()
        return doc
    })
    .catch( async error => {
        await this.deleteOne({
            artist: artist_id,
            event: event_id,
        })
        return Promise.reject({error: error.errors.message}) //validation error message
    })
}

Group.getGlobal = async function (artist_id) {
    return this.findOne({
        artist: artist_id,
        event: null,  // forzato null
    })
    .select('-messages')
    .then( group => !!group
        ? group
        : this.create({
            artist: artist_id,
        })
    )
    .then( group => group
        .populate({
            path: 'artist',
            populate: {
                path: 'tours',
            }
        })
    )
    .catch( error => Promise.reject(error.message) )
}

Group.getEvent = async function (event_id) {
    return this.findOne({
        event: event_id,
        artist: null // non è necessario ai fini della query
    })
    .select('-messages')
    .then( group => !!group
        ? group
        : this.create({
            event: event_id,
        })
    )
    // TODO: artista non valorizzato
    .then( group => group
        .populate({
            path: 'event',
            populate: {
                path: 'tour',
            }
        })
    )
    .catch( error => Promise.reject(error.message) )
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
    //.then( messages => messages.map( m => m.user._id===sock.user._id ? {...m, isSelf: true} : m ))
    .catch( error => Promise.reject(error.message) )
}

/**
 * Lista i gruppi a cui l'utente specificato e' unito
 */
Group.joined = async function (uid) {
    return this
        .find({ members: uid })
        .then( groups => groups.map(
            g => ({...g, members: g.members.length})
        ))
}

/**
 * Controlla se si e' membro del gruppo specificato
 */
Group.isMember = async function (group_id, uid) {
    return this
        .findOne({
            _id: group_id,
            members: { $in: [uid] }
        })
}
