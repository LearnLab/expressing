const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router
	.route('/users')
	.get(usersController.getUsers)
	.post(usersController.createUser);

router
	.route('/users/:user')
	.get(usersController.getUser)
	.put(usersController.updateUser)
	.delete(usersController.deleteUser);

// Export routes
module.exports = router;
