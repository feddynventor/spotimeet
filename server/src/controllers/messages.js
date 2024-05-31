const Message = require('../models/Message');
const Group = require('../models/Group');

module.exports = {
    new: async (sock, next) => {
        sock.on('message', async data => Group
            .updateOne({ _id: sock.group._id }, { $push: {
                messages: await Message.create({
                    user: sock.user._id,
                    date: new Date(),
                    text: data,
                })
            } })
        )
        next()
    }

}