import {
	Schema,
	model
} from 'mongoose';

const tripSchema = new Schema({
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

}, {
	collection: "tripsummaries",
    minimize: false,
	versionKey: false // You should be aware of the outcome after set to false
});

//var Trip = mongoose.model('tripsummaries', tripSchema);
//module.exports = Trip;

export default {
	name: "tripSchema",
	schema: tripSchema
}