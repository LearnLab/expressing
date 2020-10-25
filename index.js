const express = require('express');
const app = express();

// Execute database code
require('./models/db');

const port = process.env.PORT || 5000;

// Import api routes
const apiRoutes = require('./routes/api');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use('/api', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', `http://localhost:${port}`);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

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
