const movieDB = require('../movieDB.js');
const { MovieModel, UserModel, ReviewModel } = movieDB.getModel();

module.exports = async (req, res, next) => {
    // get movie id from url 
    const movieId = req.params.id;
    // get review from req body 
    const { review } = req.body;
    // find user by userId 
    const user = await UserModel.findOne({ userId: 1 });
    try {
        // create new instance of review 
        const newReview = new ReviewModel({
            user: user._id,
            movie: movieId,
            review: review
        });
        // save review
        await newReview.save();
        // redirect to movies 
        res.redirect('/movies');
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).render('500');
    }
};
