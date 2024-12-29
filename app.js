const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const authRoute = require('./routes/authRoute');

dotenv.config();


// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

//View Engine
app.set('view engine', 'ejs');

// Connect to DataBase
const dbURI = process.env.DB_CONNECT;
mongoose.connect(dbURI)
	.then((result) => app.listen(3000, 'localhost'))
	.catch((err) => console.log(err));

//Routes
app.get('/', (req, res) => res.render('home'));

app.use(authRoute);