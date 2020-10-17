// Mockup data
const usersMockup = require('./mocks');

// Database data
const mongoose = require('mongoose');
const User = mongoose.model('User');

const getUsers = (req, res) => { };

const getUser = (req, res) => { };

const createUser = (req, res) => { };

const updateUser = (req, res) => { };

const deleteUser = (req, res) => { };

module.exports = {
	getUsers,
	getUser,
	createUser,
	deleteUser,
	updateUser
};
