'use strict';

const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/', require('./controllers/index'));

app.use('/api/articles', require('./api/articles'));

app.use((req, res, next) => {
	console.log(`Not found URL: ${req.url}`);
	res.status(404).send('Page not found.');
});

app.use((err, req, res, next) => {
	console.log(`Internal error(${res.statusCode}): ${err.message}`);
	res.status(err.status || 500);
});

app.listen(8080, () => console.log('listening on :8080'));