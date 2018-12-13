var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var careerSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
		trim: true
	},
	lastname: {
		type: String,
		trim: true
	},
	address: {
		type: String,
		trim: true
    },
    city:{
		type: String,
		trim:true
    },
    state:{
		type: String,
		trim: true
    },
    zipcode:{
		type:Number,
		trim:true
    },
    phone_no:{
		type:Number,
		trim:true
	},
	email: {
		type: String,
		trim: true
	},
	vrd_ref_number: {
		type: String,
		trim: true
    },
    currentLocation:{
		type:String,
		trim:true
	},
	gender: {
		type: String,
		trim: true
	},
	currentEmpName: {
		type: String,
		trim: true
	},
	jobTitle: {
		type: String,
		trim: true
	},
	nightShift: {
		type: String,
		trim: true
	},
	totalExp: {
		type: String,
		trim: true
	},
	keySkills: {
		type: String,
		trim: true
	},
	references: {
		type: String,
		trim: true
	}
},{
    versionKey: false // You should be aware of the outcome after set to false
});
var Career = mongoose.model('career', careerSchema);
module.exports = Career;