var mongoose = require('mongoose');

var jobBoardSchema = new mongoose.Schema({
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
        trim: true,
        unique: true
    },
    experience: {
        type: String,
        trim: true
    },
    requirement: {
        type: Array
    }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

var jobBoardModel = mongoose.model('jobBoard', jobBoardSchema);
module.exports = jobBoardModel;