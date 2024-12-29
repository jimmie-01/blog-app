

// controller functions
module.exports.signup_get = (req, res) => {
	res.render('register');
  };
  
  module.exports.login_get = (req, res) => {
	res.render('login');
  };
  
  module.exports.signup_post = (req, res) => {
    res.render('login');
  };
  
  module.exports.login_post = (req, res) => {
	res.send('log in');
  };