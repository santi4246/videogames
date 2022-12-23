const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db');
const { APIKEY } = process.env;
const { isUuid } = require('uuidv4');

async function listGames () {
    let options = {headers: {"Accept-Encoding": "gzip,deflate,compress"}};
        const api = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}`, options);
        let data = api.data.results;
        let i = 0;
        let page = 2;
        while (i < 4) {
            let info = await axios(`https://api.rawg.io/api/games?key=${APIKEY}&page=${page}`);
            data = data.concat(info.data.results);
            page++;
            i++;
        }
        const videogames = [];
        for (let i = 0; i < data.length; i++) {
            let game = {
                id: data[i].id,
                name: data[i].name,
                img: data[i].background_image,
                genres: data[i].genres.map(e => e.name),
                description: data[i].tags.map(e => e.name),
                launch: data[i].released,
                rating: data[i].rating,
                platforms: data[i].platforms.map(e => e.platform.name)
            }
            videogames.push(game);
        }
        let gamesDB = await Videogame.findAll({include: [{model: Genre}, {model: Platform}]});
        for (let i = 0; i < gamesDB.length; i++) {
            let game = {
                id: gamesDB[i].id,
                name: gamesDB[i].name,
                genres: gamesDB[i].genres.map(e => e.name),
                description: gamesDB[i].description,
                launch: gamesDB[i].launch,
                rating: gamesDB[i].rating,
                platforms: gamesDB[i].platforms.map(e => e.name),
                img: gamesDB[i].img
            }
            videogames.unshift(game);
        }        
        return videogames;
}

module.exports = {
    listGames
}