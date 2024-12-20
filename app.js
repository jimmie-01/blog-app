const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

const app = express();

dotenv.config();

//middleware
app.use(express.urlencoded({ extended: false }));

//E
app.set('view engine', 'ejs');
app.set('views', 'views')

//connect to DataBase
const dbURI = process.env.DB_CONNECT;
mongoose.connect(dbURI)
	.then(result => app.listen(3000, 'localhost'))
	.catch(err => console.log(err));

// Authentication Route
app.use('/', authRoute);

app.get('/', (req, res) => {
	res.render('index');
})