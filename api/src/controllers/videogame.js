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
                platforms: array[i].platforms.map(e => e.platform.name),
                img: array[i].img
            }
            games.push(obj);
        }        
        return games;
}

module.exports = {
    listGames
}