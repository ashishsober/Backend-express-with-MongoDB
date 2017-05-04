const dbobj = require('./db.js');
const crypto = require('crypto');
const schema = require('../../schemas/userSchema.js');

exports.register = function(req, res){
         let post=req.body;
		 let db =dbobj.db;
		 
         db.collection('users').save(post, (err, result) => {
		    if (err) return console.log(err)
            console.log('saved to database');
		    res.send('saved to database');
		  })
        
};

exports.getUser = function(req, res){
        let db =dbobj.db;
		//console.log(db.collection('users').find());
        db.collection('users').find().toArray(function(err,results){
        	console.log(results);
        	res.send(results);
        })
};