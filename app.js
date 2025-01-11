const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');
const authRoute = require('./routes/authRoute');
const blogRoute = require('./routes/blogRoute');

dotenv.config();

const app = express();

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

// Connect to db
const dbURI = process.env.DB_CONNECT;
mongoose.connect(dbURI)
	.then((result) => app.listen(3000, 'localhost'))
	.catch((err) => console.log(err));



//Set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('*', checkUser);
//Route
app.use(authRoute);
app.use(blogRoute);