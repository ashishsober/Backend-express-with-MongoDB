import { Schema } from "mongoose";

var contactSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    phone_no: {
        type: Number,
        trim: true
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
}, {
        collection: "contact",
        minimize: false,
        versionKey: false
    });


export default {
    name: "contactSchema",
    schema: contactSchema
}