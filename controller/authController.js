const User= require('../model/models');

// controller functions
module.exports.signup_get = (req, res) => {
	res.render('signup');
  };
  
module.exports.login_get = (req, res) => {
	res.render('login');
  };
  
module.exports.signup_post =  async(req, res) => {
    const { name, email, password}  = req.body;

    const user = await User.create({name, email, password});
    res.redirect('login')
  };
  
module.exports.login_post = (req, res) => {
	res.send('log in');
  };