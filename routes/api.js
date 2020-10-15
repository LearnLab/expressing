const express = require('express');
const router = express.Router();
const usersMockup = require('./mocks');

router.get('/users', (req, res) => {
	res
		.status(200)
		.set('Content-Type', 'application/json')
		.json({
		'status': 'success', 
		'data': {
			'users': usersMockup
		}
	});
});

// Export routes
module.exports = router;
