var mongoose = require('mongoose');

var tripSchema = new mongoose.Schema({
	truckNo: {
		type: String,
		required: true,
		trim: true
	},
	status: {
		type: String,
		required: true,
		trim: true
	},
	tripDetails: {
		from: {
			type: String,
			required: true
		},
		to: {
			type: String,
			required: true
		},
		startDate: {
			type: String,
			required: true
		},
		endDate: {
			type: String,
			required: true
		}
	},
	partyDetails: {
		soldToParty: {
			type: String,
			required: true
		},
		contactDetails: {
			type: Number,
			required: true
		},
		amount: {
			type: Number,
			required: true
		},
		paid: {
			type: String,
			required: true
		}
	}

},{
    versionKey: false // You should be aware of the outcome after set to false
});

var Trip = mongoose.model('tripsummaries', tripSchema);
module.exports = Trip;