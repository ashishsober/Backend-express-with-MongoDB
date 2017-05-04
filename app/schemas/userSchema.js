var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	first_name:String,
	last_name:String,
	email:String
});

module.exports.users = mongoose.model('users', userSchema);