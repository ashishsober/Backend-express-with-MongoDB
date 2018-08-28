import * as mongoose from "mongoose"

const tripSchema = new mongoose.Schema({
							truckNo:{ 
								        type: String,
								        required:true,
								        trim:true
								       },
							status:{
								        type: String,
								        required:true,
								        trim:true
								  },
							tripDetails: {
								    from: { type: String,required:true  },
								    to:  { type: String,required:true  },
								    startDate: {type:String,required:true},
							        endDate: {type:String,required:true}
								  },
							partyDetails:{
									    soldToParty: {type:String,required:true},
									    contactDetails: {type:Number,required:true},
									    amount: {type:Number,required:true},
									    paid: {type:String,required:true}
								      }
						 
							});

const Trip = mongoose.model('tripsummaries', tripSchema);
module.exports=Trip;