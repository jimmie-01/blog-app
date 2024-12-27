const router = require('express').Router();
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const User = require('../model/models');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../validation');



router.get('/register', (req, res) => {
	res.render('register');
});

router.post('/register', async(req, res) => {
	//Register Credential Validation
	const Validation = registerValidation(req.body);
	if (Validation.error){
		return res.status(400).render('register', { error: Validation.error.details[0].message });
	};

	//Check if user already exists
	const emailExist = await User.findOne({ email: req.body.email });
	if(emailExist) return res.status(400).send('Email already exists');

	 // Hash Password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	//Create New User
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	});
	try{
		await user.save();
		res.redirect('/login');
	} catch(err) {
		res.status(400).send(err);
	}
});

router.get('/index', (req, res) => {
	res.render('index');
});

router.get('/login', (req,res) => {
	res.render('login');
});

//Login
router.post('/login', async(req, res) => {
	// Validate User Credentials
	const Validation = loginValidation(req.body);
	if (Validation.error){
		return res.status(400).render('login', { error: Validation.error.details[0].message });
	};

	//Authenticate user Email
	const user = await User.findOne({ email: req.body.email });
	if(!user) return res.status(400).send('Incorrect Email or password');
	// Verify password
	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if(!validPassword) return res.status(400).send('Password Incorrect');
	
	//Create and assign token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.cookie('jwt', token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
	res.header('auth-token', token).send(token);
});


module.exports = router;