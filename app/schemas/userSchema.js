var mongoose= require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
							first_name:{ 
								        type: String,
								        required:true,
								        trim:true
								       },
							last_name:{
								        type: String,
 								        required:true,
								        trim:true
								     },
							email:{ 
								         type: String,
								         unique: true,
								         required: true,
								         trim: true
						              },
						    username: {
									    type: String,
									    unique: true,
									    required: true,
									    trim: true
								      },
						    password: {
						                type: String,
								        required: true,
								      },
						    passwordConf: {
						                type: String,
						                required: true,
						              }
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
module.exports=User;

