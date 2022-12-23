const express = require('express');
const router = express.Router();
const controllers = require('../controllers/genre');

router.get('/', async (req, res, next) => {
    try {
        const result = await controllers.listGenres();
        return res.status(200).json({ genres: result });
    } catch (error) {
        next(error);
    }
});

module.exports = router;