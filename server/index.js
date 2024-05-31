const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/spotimeet");
// mongoose fa buffering delle calls a model functions internamente, quindi non serve await

const express = require('express');
const app = express();
const { createServer } = require("http");
const httpServer = createServer(app);
// per fare multiplex con socket.io

app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(require("cookie-parser")());

app.use('/socktest', express.static(__dirname + '/socktest.html'));

const { Server } = require('socket.io');
const websocket = new Server(httpServer);


const spotifyController = require('./src/controllers/spotify');
app.get('/login/oauth', spotifyController.spotifyOAuth);
app.get('/login/oauth/complete', spotifyController.callback);

const userController = require('./src/controllers/user');
app.post('/login', userController.login);
app.post('/signup', userController.signUp);


const auth = require('./src/middlewares/auth');
app.use(auth.authenticateToken);

app.use('/user', require('./src/routes/user'));
app.use('/artist', require('./src/routes/artists'));
app.use('/group', require('./src/routes/groups'));

websocket.use( auth.authenticateSocket );  // alla creazione del socket, connessione o riconnessione

websocket.use( (sock, next) => {
    sock.on('message', (data) => {
        console.log(sock.user.profile.displayName, data);
    });
    next()
});

const messageController = require('./src/controllers/messages');
websocket.use( messageController.new );

httpServer.listen(3000, () => {
    console.log('Server running on port 3000');
})