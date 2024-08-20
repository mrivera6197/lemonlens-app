const movieDB = require('../movieDB.js');
const { MovieModel, UserModel, ReviewModel } = movieDB.getModel();

module.exports = async (req , res , next) => {
        // get movies, users, reviews from db 
        let movies = await MovieModel.find({});
        let users = await UserModel.find({});
        let reviews = await ReviewModel.find({});

        // map over each movie
        let movieResults = movies.map( movie => {
            // calc avg rating 
            const ratings = movie.ratings; 
            const totalRating = ratings.reduce((sum, rating) => {
                // Check if the curr rating is valid
                if (!isNaN(parseFloat(rating.rating))) {
                    return sum + parseFloat(rating.rating);
                } else {
                    return sum;
                }
            }, 0);
            const avgRating = (totalRating / ratings.length).toFixed(1);

            return {
                id: movie._id,
                title: movie.movieTitle,
                year: movie.year, 
                director: movie.director,
                ratings: avgRating, 
            }
        });
        // map over each user 
        let userResults = users.map( user => {
            // filter out reviews for curr user 
            let userReviews = reviews.filter(review => String(review.user) === String(user._id))
                                        .map(review => review.toObject());

            return {
                id: user._id,
                username: user.username, 
                ratings: user.ratings,
                reviews: userReviews, 
            }
        });
        // render display movies for admin view with movie and user data 
        res.render('displayMoviesAdminView',
                {title:"Movie List", data:movieResults, userData:userResults});
        
};
