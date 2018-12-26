import { Schema, model } from "mongoose";

let contactSchema:Schema = new Schema({
	name: {
		type: String,
		trim: true
    },
	email: {
		type: String,
		trim: true
	},
	phone_no:{
		type:Number,
		trim:true
    },
    service: {
		type: String,
		trim: true
    },
    other: {
		type: String,
		trim: true
    },
    comment: {
		type: String,
		trim: true
	}
},{
    versionKey: false // You should be aware of the outcome after set to false
});

export default model('contact', contactSchema)