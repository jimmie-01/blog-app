const router = require('express').Router();
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
		return res.status(400).send(Validation.error.details[0].message);
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

router.get('/login', (req,res) => {
	res.render('login');
});

router.post('/login', (req, res) => {
	
})

module.exports = router;