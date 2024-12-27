const router = require('express').Router();
const verify = require('./verifyToken');


router.get('/index', verify, (req, res) => {
	res.render('index');
})

module.exports = router;