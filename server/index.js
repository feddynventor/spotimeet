
const eventsRepo = require('./src/repositories/events');
const Artist = require('./src/models/Artist');

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/spotimeet");
// mongoose buffers model function calls internally

(async ()=>{
    await eventsRepo.get('annalisa');
})()