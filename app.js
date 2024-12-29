const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/authRoute');

dotenv.config();

const app = express();

// Connect to db
const dbURI = process.env.DB_CONNECT;
mongoose.connect(dbURI)
	.then((result) => app.listen(3000, 'localhost'))
	.catch((err) => console.log(err));

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));

//Set view engine
app.set('view engine', 'ejs');

//Route
app.get('/', (req, res) => {
	res.render('home');
});

//Authentication Route
app.use(authRoute);