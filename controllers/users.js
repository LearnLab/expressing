// Mockup data
const usersMockup = require('./mocks');

// Database data
const mongoose = require('mongoose');
const User = mongoose.model('User');

const getUsers = (req, res) => { };

const getUser = (req, res) => { };

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
						'error': err
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

const updateUser = (req, res) => { };

const deleteUser = (req, res) => { };

module.exports = {
	getUsers,
	getUser,
	createUser,
	deleteUser,
	updateUser
};
