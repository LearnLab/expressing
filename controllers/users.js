// Mockup data
const usersMockup = require('./mocks');

// Database data
const mongoose = require('mongoose');
const User = mongoose.model('User');

const getUsers = (req, res) => {
	User.find({}, 'name email username', (err, users) => {
		if(err) {
			return res
				.status(400)
				.json({
					'status': 'error',
					'data': {
						'error': err.errors
					}
				});
		} else {
			return res
				.status(200)
				.json({
					'status': 'success',
					'data': {
						'users': users
					}
				});
		}
	});
};

const getUser = (req, res) => {
	User.findOne({ username: req.params.user }, 'name email username', (err, user) => {
		if(err) {
			return res
				.status(400)
				.json({
					'status': 'error',
					'data': {
						'error': err.errors
					}
				});
		} else {
			return res
				.status(200)
				.json({
					'status': 'success',
					'data': {
						'user': user
					}
				});
		}
	});
};

const createUser = (req, res) => {
	User.create({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username
	}, (err, user) => {
		if(err) {
			return res
				.status(400)
				.json({
					'status': 'error',
					'data': {
						'error': err.errors
					}
				});
		} else {
			return res
				.status(201)
				.json({
					'status': 'success',
					'data': {
						'user': user
					}
				});
		}
	});
};

const updateUser = (req, res) => {
	User.findOneAndUpdate({ username: req.params.user }, {
		name: req.body.name,
		email: req.body.email
	}, {
		'new': true,
		fields: 'name email username',
		runValidators: true
	}, (err, user) => {
		if(err) {
			return res
				.status(400)
				.json({
					'status': 'error',
					'data': {
						'error': err.errors
					}
				});
		} else {
			return res
				.status(201)
				.json({
					'status': 'success',
					'data': {
						'user': user
					}
				});
		}
	});
};

const deleteUser = (req, res) => {
	User.findOneAndDelete({ username: req.params.user }, (err) => {
		if(err) {
			return res
				.status(400)
				.json({
					'status': 'error',
					'data': {
						'error': err.errors
					}
				});
		} else {
			return res
				.status(201)
				.json({
					'status': 'success',
					'data': { }
				});
		}
	});
};

module.exports = {
	getUsers,
	getUser,
	createUser,
	deleteUser,
	updateUser
};
