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
        sock.on('message', async data => {
            const messageObj = await Message.create({
                user: sock.user._id,
                timestamp: new Date(),
                text: data,
            })
            return Group
            .updateOne({ _id: sock.group._id }, { $push: {
                messages: messageObj
            } })
            .then( () => sock.broadcast.to(sock.group._id.valueOf()).emit('message', {
                    ...messageObj._doc,
                    user: sock.user, //intero obj (TODO: riduci)
                })
            )
	})
        next()
    },
    status: (sock, next) => !!sock.api ? sock.api
        .get('/me/player/currently-playing')
	.then( res => res.status === 204 ? Promise.reject() : res)
        .then( res => res.data.item)
        .then( data => sock.broadcast.to(sock.group._id.valueOf())
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
