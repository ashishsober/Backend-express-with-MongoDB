import { Schema } from "mongoose";


var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    photoURL: {
        type: String,
        trim: true
    },
    displayName: {
        type: String,
        trim: true
    },
    providerId: {
        type: String,
        trim: true
    },
    uid: {
        type: String,
        trim: true
	},
	createdDate: { type: Date, default: Date.now },
	updatedDate: {
        type: Date,
        trim: true
    },
    signInStatus :{
        type:String,
        trim:true
    },
	type:{
		type:String,
		trim:true
	},
	notificationToken:{
		type:String,
		trim:true
	},
	ownerOf:{
		type:new Array,
	}
}, {
        collection: "user",
        minimize: false,
        versionKey: false
    });

export default {
    name: "userSchema",
    schema: userSchema
}