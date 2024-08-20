var express = require('express');
// create router instance 
var router = express.Router();

// other modules for different routes 
var displayMovies 	= require("./displayMovies");
var home            = require('./home')
var addMovie 			= require("./addMovie");
var addRating     = require("./addRating");
var saveRating = require("./saveRating");
var addReview     = require("./addReview");
var saveReview = require("./saveReview");
var saveMovie			= require("./saveMovie");
var editMovie			= require("./editMovie");
var saveAfterEdit 	= require("./saveAfterEdit");
var deleteMovie		= require("./deleteMovie");
var deleteMovieAfterConfirm 		= require("./deleteMovieAfterConfirm");
var displayMoviesAdmin = require("./displayMovieAdmin");
var adminDeleteReview = require("./deleteReview"); 
var searchMovie = require("./searchMovie"); 
var getMovies = require('./getMovies'); 
var getMoviesByTitle = require('./getMoviesByTitle');
var getMoviesByYear = require('./getMoviesByYear'); 

// define routes 

// redirect to home page 
router.get('/', function(req, res, next) {
  res.redirect('/home');
});

// home page route 
router.get('/home',               home); 

// user view routes 
router.get('/movies', 						displayMovies);

router.get('/movies/addRating/:id', 	addRating);
router.post('/movies/addRating/:id', 	saveRating);

router.post('/movies/title', searchMovie)

router.get('/movies/addReview/:id', 	addReview);
router.post('/movies/addReview/:id', 	saveReview);

// admin view routes 
router.get('/moviesAdmin', displayMoviesAdmin); 

router.get('/moviesAdmin/add', 				addMovie);
router.post('/moviesAdmin/add', 			saveMovie);

router.get('/moviesAdmin/edit/:id', 	editMovie);
router.post('/moviesAdmin/edit/:id', 	saveAfterEdit);

router.get('/reviews/delete/:id', 	adminDeleteReview);

router.get('/moviesAdmin/delete/:id', deleteMovie);
router.post('/moviesAdmin/delete/:id', deleteMovieAfterConfirm);


//rest api in XML and JSON formats for the movie list
router.get('/getMovies', getMovies)

//rest api in XML and JSON formats for movie by title 
router.get('/titles/:title', getMoviesByTitle)

//rest api in XML and JSON formats for the movie by year 
router.get('/year/:year', getMoviesByYear)

// export the router 
module.exports = router;
