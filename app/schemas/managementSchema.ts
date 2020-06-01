import { Schema } from "mongoose";


var managementSchema = new Schema({
    emailid: {
        type: String,
        trim: true
    },
    profileImage: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    position: {
        type: String,
        trim: true
    },
    discription: {
        type: String,
        trim: true
    },
    creationTime: {
        type: Date,
        trim: true
    }
}, {
        collection: "users",
        minimize: false,
        versionKey: false
    });


export default {
    name: "managementSchema",
    schema: managementSchema
}