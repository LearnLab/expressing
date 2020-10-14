const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.type('text/plain');
	res.send('This is the server running');
});

app.listen(port, () => {
	console.log(`Express started in port ${port}.`)
	console.log('Press Ctrl + c to terminate.');
});
