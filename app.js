const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/authRoute');
const cookieParser = require('cookie-parser');
const { verifyRoute, checkUser } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());

// Connect to db
const dbURI = process.env.DB_CONNECT;
mongoose.connect(dbURI)
	.then((result) => app.listen(3000, 'localhost'))
	.catch((err) => console.log(err));



//Set view engine
app.set('view engine', 'ejs');

app.get('*', checkUser);
//Route
app.get('/', (req, res) => {
	res.render('home');
});
app.get('/blogs', verifyRoute, (req, res) => {
	res.render('blogs');
})
//Authentication Route
app.use(authRoute);