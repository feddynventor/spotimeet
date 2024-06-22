const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env['MONGO_HOST']}:27017/spotimeet`);
// mongoose fa buffering delle calls a model functions a runtime, quindi non serve await

const express = require('express');
const app = express();
const { createServer } = require("http");
const httpServer = createServer(app);
// per fare multiplex con socket.io

app.use(express.json()); // To parse content-type: json
app.use(require("cookie-parser")());
if (!!!process.env['PRODUCTION'])
    app.use(require('cors')({
        credentials: true,
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    }))
else
    app.use(require('cors')({
        credentials: true,
        origin: ['https://spotimeet.fedele.website'],
    }))

const router = express.Router();

const { Server } = require('socket.io');
const websocket = new Server(httpServer, !!process.env['PRODUCTION'] ? undefined : {
    cors: {
        origin: "http://127.0.0.1:3000",
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["authorization"],
    }
});
if (!!!process.env['PRODUCTION']) router.use('/socktest', express.static(__dirname + '/socktest.html'));

const spotifyController = require('./src/controllers/spotify');
router.get('/login/oauth', spotifyController.spotifyOAuth);
router.get('/login/oauth/complete', spotifyController.callback);

const userController = require('./src/controllers/user');
router.post('/login', userController.login);
router.post('/signup', userController.signUp);


const auth = require('./src/middlewares/auth');
router.use(auth.authenticateToken);

router.use('/user', require('./src/routes/user'));
router.use('/artist', require('./src/routes/artists'));
router.use('/group', require('./src/routes/groups'));

websocket.use( auth.authenticateSocket );  // alla creazione del socket, connessione o riconnessione

const messageController = require('./src/controllers/messages');
websocket.on( 'connect', messageController.getMessages );
websocket.use( messageController.status );

websocket.use( messageController.new );


app.use(process.env['BASE_URL'], router);
httpServer.listen(3000, () => {
    console.log('Server running on port 3000');
})
