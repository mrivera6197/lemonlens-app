module.exports = (req , res , next) => {
		// render add movie view 
		res.render('addMovieView', 
			// pass in title data 
			{title: 'Add a Movie'})

};
