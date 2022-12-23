const express = require('express');
const router = express.Router();
const controllers = require('../controllers/videogame');

router.get('/', async (req, res, next) => {
    try {
        const games = await controllers.listGames();
        return res.status(200).json({ videogames: games });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router;