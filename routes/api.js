const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
	secret: process.env.JWT_SECRET,
	requestProperty: 'payload', 
	algorithms: ['HS256']
});
const usersController = require('../controllers/users');
const authController = require('../controllers/authentication');

router.post('/register', authController.register);
router.post('/login', authController.login);

router
	.route('/users')
	.get(usersController.getUsers);

router
	.route('/users/:user')
	// Authentication optional
	.get(usersController.getUser)
	// These require authentication
	.put(auth, usersController.updateUser)
	.delete(auth, usersController.deleteUser);

// Export routes
module.exports = router;
