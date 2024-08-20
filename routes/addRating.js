const movieDB = require('../movieDB.js');
const { MovieModel, UserModel, ReviewModel } = movieDB.getModel();

module.exports = async (req , res , next) => {
    // get id from url 
    let id = req.params.id;  
    // check for id 
    if (id) {
        // find movie with matching id 
        MovieModel.findById(id, (err, movie) => {
            // if error console log error 
            if(err)
                console.log("Error Selecting : %s ", err); 
            // if not found, render 404 message 
            if(!movie)
                return res.render('404');
            // if found, render raing view and pass movie data
            res.render('addRatingView', 
                {title:'Add a Rating', 
                data: {
                    title: movie.movieTitle, 
                    director: movie.director, 
                    id: id,
                    ratings: movie.ratings, 
                }
            })
        })
    }

};

