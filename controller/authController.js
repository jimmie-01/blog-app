const User= require('../model/models');
const jwt = require('jsonwebtoken');


//handle Errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {email: '', password: ''};

  // duplicate user error handling
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  };

  // validation errors
  if(err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  };
  return errors;
};

//JWT creation function
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  });
};


// controller functions
module.exports.signup_get = (req, res) => {
	res.render('signup');
  };
  
module.exports.login_get = (req, res) => {
	res.render('login');
  };
  
module.exports.signup_post =  async (req, res) => {
    const { name, email, password}  = req.body;
    
    try{
      const user = await User.create({ name, email, password });
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  };
  
module.exports.login_post = (req, res) => {
	res.send('log in');
  };