
const express = require('express');
const router = express.Router();

const loginMiddleware = require('../middlewares/auth');
const artistController = require('../controllers/artists');

module.exports = router;

router.use(loginMiddleware.authenticateToken);

router.get('/:id?',
    (req, res) => (!!req.query.q) ? artistController.search(req, res) : artistController.get(req, res),
    (req, res) => res.status(400).send({error: 'Richiesta non valida', p: req.params, q: req.query})
);