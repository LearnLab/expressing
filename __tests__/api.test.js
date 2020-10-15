// Import application
const app = require('../index');
const request = require('supertest');

// Data to feed and consume
const userToCreate = {
	name: 'Alejandra Rojas',
	email: 'aleja-rojas20@gmail.com',
	username: 'aleja-rojas20'
};

// Imitate an entire process of creating, consulting and deleting
describe('Endpoints for users resource', () => {

	// Consult all users
	test('GET /api/v1/users should return all users', async () => {
		const res = await request(app)
			.get('/api/v1/users');

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('status', 'success');
		expect(res.body).toHaveProperty('data');
		expect(res.body.data).toHaveProperty('users');
		expect(res.body.data.users.length).toBeGreaterThanOrEqual(0);
	});

	test('POST /api/v1/users should create a user', async () => {
		const res = await request(app)
			.post('/api/v1/users')
			.send(userToCreate);

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('status', 'success');
		expect(res.body).toHaveProperty('data');
		expect(res.body.data).toHaveProperty('user', userToCreate);
	});

	test(`GET /api/v1/users/${userToCreate.username} should return the user`, async () => {
		const res = await request(app)
			.get(`/api/v1/users/${userToCreate.username}`);

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('status', 'success');
		expect(res.body).toHaveProperty('data');
		expect(res.body.data).toHaveProperty('user', userToCreate);
	});
});

describe('Endpoints for publications resource', () => {

	// Consult all users
	test('GET /api/v1/ should return all publications', async () => {
		const res = await request(app)
			.get('/api/v1');

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('status', 'success');
		expect(res.body).toHaveProperty('data');
		expect(res.body.data).toHaveProperty('publications');
		expect(res.body.data.publications.length).toBeGreaterThanOrEqual(0);
	});

});
