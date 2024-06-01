const Message = require('../models/Message');
const Group = require('../models/Group');

module.exports = {
    new: (sock, next) => {
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
    },
    status: (sock, next) => !!sock.api ? sock.api
        .get('/me/player/currently-playing')
        .then( res => res.data.item)
        .then( data => sock
            .to(sock.group._id)
            .emit('message', {
                status: `Sto ascoltando ${data.name} di ${data.artists[0].name}`, 
                payload: {
                    image: data.album.images.pop().url,
                    preview: data.preview_url,
                    url: data.href
                }
            })
        )

        .then( next )
        : next()
}