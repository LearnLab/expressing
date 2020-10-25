const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const authController = require('../controllers/authentication');

router.post('/register', authController.register);
router.post('/login', authController.login);

router
	.route('/users')
	.get(usersController.getUsers);

router
	.route('/users/:user')
	.get(usersController.getUser)
	.put(usersController.updateUser)
	.delete(usersController.deleteUser);

// Export routes
module.exports = router;
