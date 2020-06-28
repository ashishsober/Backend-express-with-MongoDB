import { Schema } from "mongoose";


var userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
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
	notificationToken:{
		type:String,
		trim:true
	},
    updatedTime: {
        type: Date,
        trim: true
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