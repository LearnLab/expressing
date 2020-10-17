const express = require('express');
const app = express();

// Execute database code
require('./models/db');

const port = process.env.PORT || 5000;

// Import api routes
const apiRoutes = require('./routes/api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', apiRoutes);

// Check if the app should listen or be exported as a module
if (require.main === module) {
	app.listen(port, () => {
		console.log(`Express started in port ${port}.`)
		console.log('Press Ctrl + c to terminate.');
	});
} else {
	module.exports = app;
}
