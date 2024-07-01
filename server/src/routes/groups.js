
const express = require('express');
const router = express.Router();

const groupsController = require('../controllers/groups');

module.exports = router;

// id artisti del documento mongo _id, così come event
// aggiungi utente loggato ai membri
router.put('/global/:artist', groupsController.joinArtist);
router.put('/event/:event', groupsController.joinEvent);

// get by artist _id or event _id
router.get('/global/:artist', groupsController.joinArtist);
router.get('/event/:event', groupsController.joinEvent);

// search events by city
router.get('/city', groupsController.byCity);  //query di ricerca
// list groups by tours degli artisti
router.get('/artist/:artist', groupsController.byArtist);  //object id artista
// list groups by tours degli artisti preferiti
router.get('/favourites', groupsController.favourites);  //plain solo token utente

router.get('/top', groupsController.getTop10);
router.get('/', groupsController.getJoined);
