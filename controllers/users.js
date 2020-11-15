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
	let select = 'name username';

	if (req.payload && req.payload.username && req.payload.username === req.params.user)
		select = 'name email username';

	User.findOne({ username: req.params.user }, select, (err, user) => {
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

const updateUser = (req, res) => {
	if (req.payload && req.payload.username && req.payload.username === req.params.user) {
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
	} else {
		return res
			.status(401)
			.json({
				'status': 'unauthorized',
				'data': {
					'error': {
						'name': 'Unauthorized Error',
						'message': 'You are not allowed to update another user\'s profile information.'
					}
				}
			});
	}
};

const deleteUser = (req, res) => {
	// Firsth check that there's a JWT object
	if(req.payload && req.payload.username && req.payload.username === req.params.user) {
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
	} else {
		return res
			.status(404)
			.json({
				'status': 'error',
				'data': {
					'error': {
						'name': 'Forbidden access.',
						'message': 'You cannot delete another person\'s account.'
					}
				}
			});
	}
};

module.exports = {
	getUsers,
	getUser,
	deleteUser,
	updateUser
};
