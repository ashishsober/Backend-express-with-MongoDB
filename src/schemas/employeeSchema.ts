import { Schema } from "mongoose";


var employeeSchema = new Schema({
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
    creationTime: {
        type: Date,
        trim: true
    }
}, {
        collection: "employee",
        minimize: false,
        versionKey: false
    });

export default {
    name: "employeeSchema",
    schema: employeeSchema
}