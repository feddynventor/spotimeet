
const eventsRepo = require('./src/repositories/events');
const Artist = require('./src/models/Artist');

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/spotimeet");
// mongoose buffers model function calls internally

// (async ()=>{
//     await eventsRepo.fetchByArtist('annalisa').then(res => res.map(e => e.dates)).then(console.log)
// })()

const spotifyController = require('./src/controllers/spotify');
const userController = require('./src/controllers/user');

const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(cookieParser());


app.get('/login/oauth', spotifyController.spotifyOAuth);
app.get('/login/oauth/complete', spotifyController.callback);

app.post('/login', userController.login);
app.post('/signup', userController.signUp);

const loginMiddleware = require('./src/middlewares/auth');
app.use('/user', loginMiddleware.authenticateToken);
app.get('/user/me', userController.me);

app.listen(3000, () => {
    console.log('Server running on port 3000');
})