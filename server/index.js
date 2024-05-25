const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/spotimeet");
// mongoose buffers model function calls internally

const express = require('express');
const app = express();
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(require("cookie-parser")());


const spotifyController = require('./src/controllers/spotify');
app.get('/login/oauth', spotifyController.spotifyOAuth);
app.get('/login/oauth/complete', spotifyController.callback);

const userController = require('./src/controllers/user');
app.post('/login', userController.login);
app.post('/signup', userController.signUp);

app.use('/user', require('./src/routes/user'));
app.use('/artists', require('./src/routes/artists'));

app.listen(3000, () => {
    console.log('Server running on port 3000');
})