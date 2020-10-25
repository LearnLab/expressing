// Database data
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const register = (req, res) => {
	// Validate fields
	if (!req.body.name || !req.body.email || !req.body.username || !req.body.password) {
		return res
			.status(400)
			.json({
				'status': 'failed',
				'data': {
					'errors': [
						{
							'message': 'All user fields (name, email, username, password) are required.'
						}
					]
				}
			});
	}

	const user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.username = req.body.username;
	user.setPassword(req.body.password);
	console.log(user);

	user.save((err) => {
		if(err) {
			return res
				.status(400)
				.json({
					'status': 'error',
					'data': err
				});
		} else {
			const token = user.generateJWT();

			return res
				.status(201)
				.json({
					'status': 'success',
					'data': {
						'user': user,
						'token': token
					}
				});
		}
	});
};

const login = (req, res) => {
	if (!req.body.username || !req.body.password) {
		return res
			.status(400)
			.json({
				'status': 'failed',
				'errors': [
					{
						'message': 'All fields (username, password) required'
					}
				]
			});
	}

	passport.authenticate('local', (err, user, info) => {
		let token;
		if (err) {
			return res
				.status(404)
				.json(err);
		}
		if (!user) {
			return res
				.status(401)
				.json(info);
		} else {
			token = user.generateJWT();

			return res
				.status(401)
				.json({
					'status': 'success',
					'data': {
						'user': user,
						'token': token
					}
				});
		}
	})(req, res);
};

module.exports = {
	register, 
	login
};
