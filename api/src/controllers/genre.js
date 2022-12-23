const axios = require('axios');
const { APIKEY } = process.env;

module.exports = {
    listGenres: async () => {
        let options = {headers: {"Accept-Encoding": "gzip,deflate,compress"}};
        const api = await axios.get(`https://api.rawg.io/api/genres?key=${ APIKEY }`, options)
        .then((response) => {
            return response.data.results;
        })
        .catch(error => console.log(error))
        return api.map(e => e.name);
    }
}