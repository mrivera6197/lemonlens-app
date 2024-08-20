// import mongoose for MongoDB 
const mongoose = require('mongoose');
// important credentials for MongoDB connection 
const credentials = require("./credentials.js");

const dbUrl = `mongodb://${credentials.host}:${credentials.port}/${credentials.database}`; 

let connection = null;
let movieModel = null;
let userModel = null; 
let reviewModel = null;

// create mongoose schema obj
let Schema = mongoose.Schema;

// define schema for movies 
let movieSchema = new Schema({
	movieTitle: String, 
	director: String, 
	year: String, 
	ratings: [{rating: Number}],
	reviews: [{ type: Schema.Types.ObjectId, ref: 'ReviewModel' }]

}, {
	collection: 'movies'
});

// define schema for users 
const userSchema = new Schema({
	userId: { type: Number, required: true }, 
    username: { type: String, required: true },
    ratings: [{ type: Schema.Types.ObjectId, ref: 'MovieModel' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'ReviewModel' }]
}, {
    collection: 'users' 
});

// define schema for reviews 
const reviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'UserModel' }, 
    movie: { type: Schema.Types.ObjectId, ref: 'MovieModel' },
    review: String
}, {
    collection: 'reviews' 
});

// export func to get models 
module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
            movieModel = connection.model("MovieModel", movieSchema);
            userModel = connection.model("UserModel", userSchema);
			reviewModel = connection.model('ReviewModel', reviewSchema)
		};
		// return models 
		return { MovieModel: movieModel, UserModel: userModel, ReviewModel: reviewModel };
	}
};
























