const jwt = require('jsonwebtoken');

//Middleware function to grant user access to private routes
module.exports = function(req, res, next) {
	const token = req.header('auth-token');
	if(!token) return res.status(401).send('Access Denied');

	try{
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.header = verified;
		next();
	} catch (err) {
		res.status(400).send('Invalid Token');
	}
};