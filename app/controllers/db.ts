//const configDB = require('../config/database');
import { url } from '../config/database';
import * as mongoose from "mongoose"

//const MongoClient = require('mongodb').MongoClient;

//while calling mongoose.connect we pass two parameters first is the data we created and the second is the function
//prod_url
mongoose.connect(url.prod_url, { useMongoClient: true });
// ,function(err, database){
//         if(err)
// 			console.log(err);
// 		else 
// 			console.log("i m connected to database");
		
// });













// mongoose.connection.on('open', function (ref) {
// 	mongoose.connection.db.listCollections().toArray(function(err, names) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         names.forEach(function(e,i,a) {
//             //mongoose.connection.db.dropCollection(e.name);
//             console.log("--->>", e.name);
//         });
//     }
// });
// });