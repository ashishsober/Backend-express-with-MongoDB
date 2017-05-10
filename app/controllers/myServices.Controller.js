var dbobj = require('./db.js');
var crypto = require('crypto');
var schema = require('../schemas/userSchema.js');


exports.tripSummary = function(req, res){
         var post=req.body;
		     var db =dbobj.db;
         db.collection('tripSummary').save(post, function(err, result){
		           if (err) return console.log(err)
               res.status(200);
               res.json({ message: 'Saved to database successfully' });
		     })
        
};

exports.getUser = function(req, res){
        var db =dbobj.db;
		    //console.log(db.collection('users').find());
        db.collection('users').find().toArray(function(err,results){
        	  res.set('Content-Type', 'application/json');
            res.send(results);
        })
};

exports.getTripSummary = function(req, res){
        var db =dbobj.db;
		    db.collection('tripSummary').find().toArray(function(err,results){
            res.set('Content-Type', 'application/json');
           	res.send(results);
        })
};