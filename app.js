const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.get('/register', (req, res) => {
	res.render('register');
});

app.listen(3000, 'localhost');