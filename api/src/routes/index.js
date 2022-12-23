const { Router } = require('express');
// Importar todos los routers;
const router = Router();
const gameMiddleware = require('./videogame');
const genreMiddleware = require('./genre');

// Configurar los routers
router.use('/videogames', gameMiddleware);
router.use('/genres', genreMiddleware);

module.exports = router;