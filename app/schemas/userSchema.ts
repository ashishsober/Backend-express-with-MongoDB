import {
	Schema
} from 'mongoose';

var userSchema = new Schema({
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
	nationality: {
		type: String,
		trim: true
	},
	mobile: {
		type: Number,
		required: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	aadhaar_no: {
		type: Number,
		trim: true
	},
	pan_no: {
		type: String,
		unique: true,
		trim: true
	}
}, {
	collection: "users",
	minimize: false,
	versionKey: false // You should be aware of the outcome after set to false
});

export default {
	name: "userSchema",
	schema: userSchema
}