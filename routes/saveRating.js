const movieDB = require('../movieDB.js');
const { MovieModel, UserModel, ReviewModel } = movieDB.getModel();

module.exports = async (req, res, next) => {
    // get id from url 
    const id = req.params.id;
    // get rating from the request body
    const { rating } = req.body;

    try {
        // Find the movie by ID
        const movie = await MovieModel.findById(id);

        if (!movie) {
            return res.status(404).render('404');
        }
        // Add the new rating to the movie's ratings array
        movie.ratings.push({ rating });

        // Save the updated movie document
        await movie.save();

        // redirect to /movies 
        res.redirect('/movies');
    } catch (error) {
        console.error('Error saving rating:', error);
        res.status(500).render('500');
    }
};
