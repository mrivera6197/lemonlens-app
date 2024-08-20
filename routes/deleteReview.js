const movieDB = require('../movieDB.js');
const { MovieModel, UserModel, ReviewModel } = movieDB.getModel();

module.exports =  async (req , res , next) => {
    // get id from url 
    let id = req.params.id; 
    // find movie with matching id 
    ReviewModel.findById(id, (err, review) => {
      // if error, console log error 
      if (err) {
        console.log("Error Selecting : %s ", err); 
      }
      // if movie not found, render 404 message 
      if (!review)
        return res.render('404'); 

        // if movie found, remove movie
        review.remove( (err) => {
          if (err) {
            // console error 
            console.log("Error Deleting : %s ", err); 
          // redirect to /moviesAdmin
          }
          res.redirect('/moviesAdmin')
        })
    })
    
        
  };

  