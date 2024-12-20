const router = require('express').Router();
const User = require('../model/models');


router.get('/register', (req, res) => {
	res.render('register');
});

router.post('/register', async(req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
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
})

module.exports = router;