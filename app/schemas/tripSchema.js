var mongoose= require('mongoose');

var tripSchema = new mongoose.Schema({
							truckNo:{ 
								        type: String,
								        unique:true,
								        required:true,
								        trim:true
								       },
							status:{
								        type: String,
								        required:true,
								        trim:true
								     },
							tripDetails:{ 
								         from: {type:String,required:true},
								         to: {type:String,required:true},
								         startDate: {type:String,required:true},
								         endDate: {type:String,required:true}
						                },
						    partyDetails:{
									    soldToParty: {type:String,required:true},
									    contactDetails: {type:String,required:true},
									    amount: {type:String,required:true},
									    paid: {type:String,required:true}
								      }
						 
							});

var Trip = mongoose.model('tripSummary', tripSchema);
module.exports=Trip;