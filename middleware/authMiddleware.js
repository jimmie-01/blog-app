const jwt = require('jsonwebtoken');
const User = require('../model/models');


const verifyRoute = (req, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) =>{
			if (err) {
				res.redirect('/login');
			} else {
				console.log(decodedToken);
				next();
			}
		});
	} else {
		res.redirect('/login');
	}
};

//check current user
const checkUser =  (req, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, async(err, decodedToken) =>{
			if (err) {
				console.log(err.message);
				res.locals.user = null;
				next();
			} else {
				// get user from payload if token is valid
				let user = await User.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

module.exports = { verifyRoute, checkUser };