var configDB = require('../../../config/db.js');
var mongoose= require('mongoose');
var MongoClient = require('mongodb').MongoClient;

//while calling mongoose.connect we pass two parameters first is the data we created and the second is the function
MongoClient.connect(configDB.prod_url, function(err, database){
        if(err)
			console.log(err);
		else {
			//console.log("my client from MongoClient " + database.listCollections());
			module.exports.db = database;
			console.log("i m connected");
		}
});

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