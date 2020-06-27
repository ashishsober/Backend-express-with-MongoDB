import { Schema } from "mongoose";

var jobBoardSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    jobType: {
        type: String,
        trim: true
    },
    jobId: {
        type: String,
        trim: true
    },
    experience: {
        type: String,
        trim: true
    },
    requirements: {
        type: Array
    }
}, {
        collection: "jobboards",
        minimize: false,
        versionKey: false // You should be aware of the outcome after set to false
    });


export default {
    name: "jobBoardSchema",
    schema: jobBoardSchema
}