const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Please Enter Your Name'],
	},
	email: {
		type: String,
		required: [true, 'Please Enter a valid eamil'],
		unique: true,
		validate: [isEmail, 'Please enter a valid email'],
		lowercase: true
	},
	password: {
		type: String,
		required: [true, 'please enter a password'],
		minlength: [6, 'Minimun password length is 6 characters']
	}
});

// Fire a function before saving doc to db
userSchema.pre('save', async function(next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// static method to login user
userSchema.statics.login = async function(email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error('Incorrect password');
	}
	throw Error('Incorrect email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;