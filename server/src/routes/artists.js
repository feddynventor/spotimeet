
const express = require('express');
const router = express.Router();

const artistController = require('../controllers/artists');

module.exports = router;


// id di spotify, non del documento mongo dato che potrebbe mancare
router.get('/:id?',
    (req, res) => (!!req.query.q) ? artistController.search(req, res) : artistController.get(req, res),
    (req, res) => res.status(400).send({error: 'Richiesta non valida', p: req.params, q: req.query})
);