const { model, Schema } = require('mongoose');

const Group = new model('Group', new Schema({
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        validate: {
            validator: async function (artist_id) {
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
                if (!!!event_id) return  // facoltativo
                else return await this.model('Event').exists({ _id: event_id });
            },
            message: 'Data evento non trovata',
        }
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
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
    .then( doc => doc.validate() )
    .catch( async error => {
        await this.deleteOne({
            artist: artist_id,
            event: event_id,
        })
        return Promise.reject(error.message) //validation error message
    })
}

Group.getGlobal = async function (artist_id) {
    return this.findOne({
        artist: artist_id,
        tour: null,
        event: null,
    })
    .then( group => !!group
        ? group
        : this.create({
            artist: artist_id,
        })
    )
    .then( group => group.populate('artist') )
}

Group.getEvent = async function (event_id) {
    return this.findOne({
        event: event_id,
    })
    .then( group => !!group
        ? group
        : this.create({
            event: event_id,
        })
    )
    .then( group => group.populate('event artist') )
}