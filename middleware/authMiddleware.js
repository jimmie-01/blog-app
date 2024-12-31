const jwt = require('jsonwebtoken');


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

module.exports = { verifyRoute };