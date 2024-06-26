const { model, Schema } = require('mongoose');

const Message = new model('Message', new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    timestamp: Date,
    text: String,
}))

module.exports = Message;