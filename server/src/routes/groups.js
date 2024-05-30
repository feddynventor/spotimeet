
const express = require('express');
const router = express.Router();

const groupsController = require('../controllers/groups');

module.exports = router;

// id artisti del documento mongo _id, così come tour e event
// aggiungi utente loggato ai membri
router.put('/global/:artist', groupsController.joinArtist);
router.put('/event/:event', groupsController.joinEvent);

// get by artist _id or event _id
router.get('/global/:artist', groupsController.getArtistGroup);
router.get('/event/:event', groupsController.getEventGroup);

// search events by city
router.get('/city/:city', groupsController.byCity);
// list groups by tours degli artisti
router.get('/artist/:artist', groupsController.byArtist);
// list groups by tours degli artisti preferiti
router.get('/favourites', groupsController.favourites);