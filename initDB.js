// import movieDB.js file
const MovieDB = require('./movieDB.js');
// get models 
const { MovieModel, UserModel, ReviewModel } = MovieDB.getModel();

(async() => {

	// clear existing data
	await MovieModel.deleteMany({});
	await UserModel.deleteMany({});
	await ReviewModel.deleteMany({});

	// create movies 
	let movie1 = new MovieModel({
		movieTitle:'Interstellar', 
		director:'Christopher Nolan',
		year: '2014',
		ratings: [{ rating: 8 }, { rating: 7 }], 
		reviews: [], 
	}); 

	let movie2 = new MovieModel({
		movieTitle:'The Matrix', 
		director:'Lana Wachowski and Lilly Wachowski',
		year: '1999',
		ratings: [{ rating: 9 }, { rating: 6 }],
		reviews: [], 
	}); 

	let movie3 = new MovieModel({
		movieTitle:'Mysterious SKin', 
		director:'Gregg Araki',
		year: '2004',
		ratings: [{ rating: 9 }, { rating: 8 }],
		reviews: [], 
	}); 

	let movie4 = new MovieModel({
		movieTitle:'Dune: Part Two', 
		director:'Denis Villeneuve',
		year: '2024',
		ratings: [{ rating: 9 }, { rating: 8 }],
		reviews: [], 
	}); 

	let movie5 = new MovieModel({
		movieTitle:'The Virgin Suicides', 
		director:'Sofia Coppola',
		year: '1975',
		ratings: [{ rating: 10 }, { rating: 9 }],
		reviews: [], 
	}); 

	// save movie data 
	await Promise.all([
			movie1.save(), 
			movie2.save(), 
			movie3.save(),
			movie4.save(),
			movie5.save(),
		]);

	// create users 
	let user1 = new UserModel({
		userId: 1, 
        username: 'mrivera',
        ratings: [movie1._id, movie2._id],
        reviews: []
    });

    let user2 = new UserModel({
		userId: 2, 
        username: 'fcat',
        ratings: [movie2._id, movie3._id],
        reviews: []
    });

	// save user data 
	await Promise.all([
        user1.save(),
        user2.save()
    ]);

	    // create reviews 
		let review1 = new ReviewModel({
			user: user1._id,
			movie: movie1._id,
			review: 'This movie blew my mind!'
		});
	
		let review2 = new ReviewModel({
			user: user2.id,
			movie: movie3._id,
			review: 'Amazing performances!'
		});

		let review3 = new ReviewModel({
			user: user1._id,
			movie: movie3._id,
			review: 'This was incredible!!'
		});
	
		// save review data 
		await Promise.all([
			review1.save(),
			review2.save(),
			review3.save()
		]);

	// console.log curr data 

    let currentMovies = await MovieModel.find({});
    let currentUsers = await UserModel.find({});
	let currentReviews = await ReviewModel.find({});

    console.log("Current Movies:", currentMovies);
    console.log("Current Users:", currentUsers);
	console.log("Current Reviews:", currentReviews);
	
	// exit 
	process.exit();


})();












