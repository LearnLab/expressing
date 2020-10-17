require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.CONNECTION_STRING;

mongoose.connect(connectionString, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;

const gracefulShutdown = (msg, callback) => {
	db.close(() => {
		console.log(`Mongoose disconnected through ${msg}`);
		callback();
	});
};

db.on('connected', () => console.log('MongoDB connection established'));
db.on('disconnected', () => console.log('Mongoose disconnected'));

// Close the mongoose connection once Node and Heroku emit the shutdown event
process.once('SIGUR2', () => {
	gracefulShutdown('nodemon restart', () => {
		process.kill(process.pid, 'SIGUSR2');
	});
});

process.on('SIGINT', () => {
	gracefulShutdown('App termination', () => {
		process.exit(0);
	});
});

process.on('SIGTERM', () => {
	gracefulShutdown('Heroku app shutdown', () => {
		process.exit(0);
	});
});

db.on('error', err => {
	console.error('MongoDB error: ' + err.message);
	process.exit(1);
});

require('./user');
