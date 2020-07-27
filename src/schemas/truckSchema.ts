import { Schema } from "mongoose";


var truckSchema = new Schema({
    truck_no: {
        type: String,
        trim: true,
        unique: true
    },
    truck_purchase_Date: {
        type: String,
        trim: true
    },
    avg_km: {
        type: Number,
        trim: true
    },
    driver_name: {
        type: String,
        trim: true,
    },
    driver_emailId: {
        type: String,
        trim: true,
    },
    driver_phoneNo: {
        type: Number,
        trim: true
    },
    ins_comp_name: {
        type: String,
        trim: true
    },
    ins_amount: {
        type: Number,
        trim: true
    },
    ins_valid_from: {
        type: String,
        trim: true
    },
    ins_valid_upto: {
        type: String,
        trim: true
    },
    owner_uid: {
        type: String,
        trim: true
    },
    total_trips: {
        type: Number,
        trim: true
    },
    total_profit: {
        type: Number,
        trim: true
    },
    petrol_remaining: {
        type: Number,
        trim: true
    },
}, {
        collection: "truck",
        minimize: false,
        versionKey: false
    });

export default {
    name: "truckSchema",
    schema: truckSchema
}