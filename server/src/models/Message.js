const { model, Schema } = require('mongoose');

const Message = new model('Message', new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date: Date,
    text: String,
}))

module.exports = Message;

Message.receive = async function (data) {
    return this.create({
        user: data.user,
        group: data.group,
        date: data.date,
        text: data.text,
    })
    .then(doc => doc.save())
    .catch(err => Promise.reject(err.errorResponse));
}