// User model
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
		required: true,
		type: String
	}, 
	email: {
		required: true,
		type: String, 
		unique: true
	}, 
	username: {
		required: true,
		type: String, 
		unique: true
	}
});

// This won't be imported but fetched from mongoose
mongoose.model('User', userSchema);
