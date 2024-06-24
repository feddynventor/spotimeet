const Message = require('../models/Message');
const Group = require('../models/Group');

module.exports = {
    getMessages: (sock) => Group
	.getMessages(sock.group._id)
	.then( list => {
	    sock.emit('history', list.messages.reverse() ) // sono ritornati in ordine inverso per colpa di sort DESC
	} )
    ,
    new: (sock, next) => {
        const timestamp = new Date()
        sock.on('message', async data => Group
            .updateOne({ _id: sock.group._id }, { $push: {
                messages: await Message.create({
                    user: sock.user._id,
                    timestamp,
                    text: data,
                })
            } })
            .then( () => sock.broadcast.to(sock.group._id.valueOf()).emit('message', {
                    user: sock.user, //intero obj (TODO: riduci)
                    timestamp,
                    text: data,
                })
            )
        )
        next()
    },
    status: (sock, next) => !!sock.api ? sock.api
        .get('/me/player/currently-playing')
	.then( res => res.status === 204 ? Promise.reject() : res)
        .then( res => res.data.item)
        .then( data => sock.broadcast
            .emit('message', {
                user: sock.user,
                text: `Sto ascoltando ${data.name} di ${data.artists[0].name}`, 
                payload: {
                    image: data.album.images.pop().url,
                    preview: data.preview_url,
                    url: data.href
                }
            })
        )
        .then( ()=>next() )
	.catch( ()=>next() )
        : next()
}
