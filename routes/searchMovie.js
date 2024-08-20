const movieDB = require('../movieDB.js');
const { MovieModel, UserModel, ReviewModel } = movieDB.getModel();

module.exports = async (req, res, next) => {
    // get title from req body 
    const { title } = req.body;
    try {
        // Find the movie by title (case-insensitive)
        const movies = await MovieModel.find({ movieTitle: { $regex: title, $options: 'i' } });

        if (movies.length > 0) {
            // calc avg rating 
            const ratings = movies[0].ratings; 
            const totalRating = ratings.reduce((sum, rating) => {
                // Check if the curr rating is valid
                if (!isNaN(parseFloat(rating.rating))) {
                    return sum + parseFloat(rating.rating);
                } else {
                    return sum;
                }
            }, 0);
            const avgRating = (totalRating / ratings.length).toFixed(1);

            // find reviews for movie
            const movieReviews = await ReviewModel.find({ movie: movies[0]._id });
            const reviewMessages = movieReviews.map(review => review.review);

            const movieData = {
                title: movies[0].movieTitle, 
                director: movies[0].director,
                year: movies[0].year,
                id: movies[0]._id, 
                reviews: reviewMessages, 
                ratings: avgRating, 
            }
            // render movie view with movie data 
            res.render('movieView', { data: movieData });
        } else {
            // if not found, redirect to /movies
            res.redirect('/movies');
        }
        
    } catch (error) {
        console.error('Error finding movie: ', error);
        res.status(500).render('500');
    }
};
