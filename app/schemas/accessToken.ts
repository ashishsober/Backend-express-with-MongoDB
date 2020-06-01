import { Schema } from "mongoose";


var accessTokenSchema = new Schema({

    accessToken: {
        type: String,
        trim: true
    },
    id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    creationTime: {
        type: Date,
        trim: true
    }
}, {
        collection: "accessToken",
        minimize: false,
        versionKey: false // You should be aware of the outcome after set to false
    });

export default {
    name: "accessTokenSchema",
    schema: accessTokenSchema
}