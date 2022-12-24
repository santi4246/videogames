const express = require('express');
const router = express.Router();
const controllers = require('../controllers/videogame');

router.get('/', async (req, res, next) => {
    try {
        const { name } = req.query;
        if (name) {
            const result = await controllers.searchGames(name);
            return res.status(200).json({ videogames: result });
        }
        else {
            const games = await controllers.listGames();
            return res.status(200).json({ videogames: games });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const game = await controllers.gameDetail(id);
        return res.status(200).json({game: game});
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { name, launch, rating, description, genres, platforms, img } = req.body;
        const message = await controllers.addGame(name, description, launch, rating, genres, platforms, img);
        return res.status(201).json({message: message});
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }    
});

module.exports = router;