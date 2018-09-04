var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
	full_name: {
		type: String,
		trim: true
	},
	title: {
		type: String,
		trim: true
	},
	first_name: {
		type: String,
		required: true,
		trim: true
	},
	last_name: {
		type: String,
		trim: true
	},
	aka_name: {
		type: String,
		trim: true
	},
	date_of_birth: {
		type: Date,
		trim: true
	},
	gender: {
		type: String,
		trim: true
	},
	nationality:{
		type: String,
		trim:true
	},
	mobile:{
		type:Number,
		required: true,
		trim:true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	aadhaar_no:{
		type:Number,
		trim:true
	},
	pan_no:{
		type: String,
		unique: true,
		trim: true
	}
},{
    versionKey: false // You should be aware of the outcome after set to false
});

//hashing a password before saving it to the database

// userSchema.pre('save', function (next) {
//   var user = this;
//   console.log("inside bycrypt---"+user.password);
//   bcrypt.hash(user.password, 10, function (err, hash){
//     if (err) {
//       return next(err);
//     }
//     user.password = hash;
//     next();
//   })
// });

var User = mongoose.model('users', userSchema);
module.exports = User;