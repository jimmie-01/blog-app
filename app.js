const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./model/models');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// connect to DataBase
const dbURI = 'mongodb+srv://jimmie:lastname@nodetuts.evas5.mongodb.net/blog-app?retryWrites=true&w=majority&appName=nodetuts'
mongoose.connect(dbURI)
	.then((result) => app.listen(3000, 'localhost'))
	.catch((err) => console.log(err));

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.get('/register', (req, res) => {
	res.render('register');
})

app.post('/register', async(req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword
		});

		user.save()
			.then(result => res.redirect('/login'))
			.catch(err => console.log(err));
 	} catch {
		res.redirect('/register');
	}
});
