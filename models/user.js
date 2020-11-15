// User model
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

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
	},
	hash: String,
	salt: String
});

userSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto
		.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
		.toString('hex');
};

userSchema.methods.validPassword = function(password) {
	const hash = crypto
		.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
		.toString('hex');

	return this.hash === hash;
};

userSchema.methods.generateJWT = function() {
	const expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	return jwt.sign({
		_id: this._id,
		email: this.email,
		username: this.username,
		exp: parseInt(expiry.getTime() / 1000)
	}, process.env.JWT_SECRET);
};

// This won't be imported but fetched from mongoose
mongoose.model('User', userSchema);
