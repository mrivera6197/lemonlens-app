const movieDB = require('../movieDB.js');
const { MovieModel } = movieDB.getModel();

module.exports = async (req , res , next) => { 
    const { title } = req.params;
    try {
        const movies = await MovieModel.find({ movieTitle: { $regex: title, $options: 'i' } });
        console.log("movies???", movies)
        res.format({
            'application/json': () => {
                res.json(movies);
              },
              'application/xml': () => {
                const movieData = movies.map(movie =>  `<entry title="${movie.movieTitle}" director="${movie.director}"></entry>`).join('\n');
                const xmlData = `<?xml version="1.0"?>\n<movie title="${title}">\n${movieData}\n</movie>`;
                res.type('application/xml');
                res.send(xmlData);
              },
              'default': () => {
                res.status(404);
                res.send("<b>404 - Not Found</b>");
              },
        })
    } catch (error) {
        console.error('Error getting movies by title:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}