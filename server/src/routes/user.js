
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

module.exports = router;

router.get('/', userController.me);
router.get('/token', userController.tokenInfo);
router.get('/favourites', userController.getFavouriteArtists);
router.post('/favourites', userController.addFavouriteArtist);
router.delete('/favourites', userController.removeFavouriteArtist);