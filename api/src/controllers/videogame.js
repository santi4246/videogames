const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db');
const { APIKEY } = process.env;
const { isUuid } = require('uuidv4');

async function listGames () {
    let options = {headers: {"Accept-Encoding": "gzip,deflate,compress"}};
    let i = 0;
    let page = 1;        
    let array = [];
    let games = [];
    while (i < 5) {
        let info = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=${page}`, options);            
        info.data.results.map(e => {
            array.push(e);
        });
        page++;
        i++;
    }
    let gamesDB = await Videogame.findAll({include: [{model: Genre}, {model: Platform}]});
    array = gamesDB.concat(array);
    for (let i = 0; i < array.length; i++) {
        let obj = {
            id: array[i].id,
            name: array[i].name,
            genres: array[i].genres.map(e => e.name),
            description: array[i].description,
            launch: array[i].launch,
            rating: array[i].rating,
            platforms: array[i].platforms.map(e => {
                if (typeof e === Object) {
                    return e.platform.name
                }
                else {
                    return e.name;
                }
            }),
            img: array[i].img
        }
        games.push(obj);
    }        
    return games;
}

async function searchGames (name) {
    name = name.toLowerCase();
        let games = await this.listGames();
        games = games.filter((game) => game.name.toLowerCase().includes(name));
        if (games.length) {
            return games;
        }
        else {
            return [{ name: `Not found`, img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png`, genres: [`0 results`] }]
        }
}

async function gameDetail (id) {
    if (isUuid(id)) {
        const gameDB = await Videogame.findByPk(id, {include: [{model: Genre}, {model: Platform}]});
        const array = [];
        const result = [];
        array.push(gameDB);
        for (let i = 0; i < array.length; i++) {
            let game = {
                id: array[i].id,
                name: array[i].name,
                genres: array[i].genres.map(e => e.name),
                description: array[i].description,
                launch: array[i].launch,
                rating: array[i].rating,
                platforms: array[i].platforms.map(e => e.name),
                img: array[i].img
            }
            result.push(game);
        }
        return result[0];
    }
    else {
        let options = {headers: {"Accept-Encoding": "gzip,deflate,compress"}};
        const api = await axios(`https://api.rawg.io/api/games/${id}?key=${APIKEY}`, options);
        let game = {
            id: api.data.id,
            name: api.data.name,
            description: api.data.description,
            launch: api.data.released,
            img: api.data.background_image,
            genres: api.data.genres.map(e => e.name),
            rating: api.data.rating,
            platforms: api.data.platforms.map(e => e.platform.name)
        }
        return game;
    }
}

async function addGame (name, description, launch, rating, genres, platforms, img) {
    let game = await Videogame.create({name, description, launch, rating, img});
        const array1 = genres.map(genre => Genre.create({name: genre}));
        const array2 = platforms.map(platform => Platform.create({name: platform}));
        await Promise.all(array1, array2);
        const genresDB = await Genre.findAll();
        const platformsDB = await Platform.findAll();
        for (let i = 0; i < genresDB.length; i++) {
            await game.addGenre(genresDB[i].id);
        }
        for (let i = 0; i < platformsDB.length; i++) {
            await game.addPlatform(platformsDB[i].id);
        }
        return `The game ${game.name} successfully created`;
}

module.exports = {
    listGames,
    searchGames,
    gameDetail,
    addGame
}