const router = require('express').Router();
const User = require('../model/models');
const controller = require('../controller/authController');

router.get('/signup', controller.signup_get );
router.get('/login', controller.login_get);
router.post('/signup', controller.signup_post);
router.post('/login', controller.login_post);
router.get('/logout', controller.logout_get);

module.exports = router;