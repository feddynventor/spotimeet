
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

module.exports = router;

router.get('/me', userController.me);
router.get('/token', userController.tokenInfo);
router.get('/favourites', userController.getFavouriteArtists);
router.delete('/favourites/:id', userController.removeFavouriteArtist);