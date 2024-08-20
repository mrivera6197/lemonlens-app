const movieDB = require('../movieDB.js');
const { MovieModel } = movieDB.getModel();

module.exports = async (req , res , next) => { 
    try {
        const movies = await MovieModel.find({});
        res.format({
            'application/json': () => {
                res.json(movies);
            },
            'application/xml': () => {
                const movieData = movies.map(movie => `<movie title="${movie.movieTitle}" director="${movie.director}" year="${movie.year}"></movie>`).join('\n');
                const xmlData = `<?xml version="1.0"?>\n<movies>\n${movieData}\n</movies>`;
                res.type('application/xml');
                res.send(xmlData);
            },
            'default': () => {
                res.status(404).send("<b>404 - Not Found</b>");
            },
        })

    } catch (error) {
        console.error('Error getting movie list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}