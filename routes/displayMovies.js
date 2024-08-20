const movieDB = require('../movieDB.js');
const { MovieModel, UserModel, ReviewModel } = movieDB.getModel();

module.exports = async (req , res , next) => {
        // get movies from db 
        let movies = await MovieModel.find({});
        // map over each movie 
        let results = await Promise.all(movies.map(async(movie) => {
            const ratings = movie.ratings; 
            // calc avg rating 
            const totalRating = ratings.reduce((sum, rating) => {
                // Check if the curr rating is valid
                if (!isNaN(parseFloat(rating.rating))) {
                    return sum + parseFloat(rating.rating);
                } else {
                    return sum;
                }
            }, 0);
            const avgRating = (totalRating / ratings.length).toFixed(1);
            // get reviews for curr movie 
            const movieReviews = await ReviewModel.find({ movie: movie._id });
            // extract reviews 
            const reviewMessages = movieReviews.map(review => review.review);

            return {
                id: movie._id,
                title: movie.movieTitle,
                director: movie.director,
                year: movie.year, 
                ratings: avgRating, 
                reviews: reviewMessages, 
            }
        }));
        // render display movies for user view with movie data    
        res.render('displayMoviesView',
                {title:"Movie List", data: results});
        
};
