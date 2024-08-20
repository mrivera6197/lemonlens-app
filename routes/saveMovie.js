const movieDB = require('../movieDB.js');
const { MovieModel, UserModel, ReviewModel } = movieDB.getModel();

module.exports = async (req , res , next) => {
    // get title, director, and year from req.body
    const { title, director, year } = req.body; 

    // check for input 
    if (title && director && year)  {
      // create instance of movie 
      let movie = new MovieModel({
        movieTitle: title, 
        director: director, 
        year: year, 
      })

      // save movie
      movie.save((err) => {
        // if error console.log error 
        if(err)
          console.log("Error : %s ", err); 
        // redirect to /moviesAdmin
        res.redirect('/moviesAdmin')
      })
    } else {
      // if no input, redirect to /moviesAdmin
      res.redirect('/moviesAdmin');
    }

  };
