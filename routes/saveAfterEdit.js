const movieDB = require('../movieDB.js');
const { MovieModel, UserModel, ReviewModel } = movieDB.getModel();

module.exports = async (req , res , next) => {
    // get id from url 
    let id = req.params.id;  
    // get title and director from req body 
    const { title, director } = req.body;
    
    // find movie with matching id
    MovieModel.findById(id, (err, movie) => {
        // if err, console.log error 
        if(err) {
            console.log("Error Selecting : %s ", err); 
            console.log(title, director, id)
        }
        // if movie not found, rendere 404 message 
        if(!movie)
            return res.render('404'); 

        // update movie first and last name 
        movie.movieTitle = title; 
        movie.director = director; 

        // save update 
        movie.save((err) => {
            // check for error
            if (err)
                console.log('Error updating : %s ', err); 
            // redirect to /moviesAdmin
            res.redirect('/moviesAdmin')
        })

    })
    
 };
