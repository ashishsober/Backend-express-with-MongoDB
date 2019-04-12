var mongoose = require('mongoose');

var accessTokenSchema = new mongoose.Schema({
	
	accessToken: {
		type: String,
		trim: true
    },
    id :{
        type: String,
        unique: true,
        required: true,
		trim: true
    },
    creationTime :{
        type:Date,
        trim: true
    }
},{
    versionKey: false // You should be aware of the outcome after set to false
});

var accessToken = mongoose.model('accessToken', accessTokenSchema);
module.exports = accessToken;