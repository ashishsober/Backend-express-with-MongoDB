var dbobj = require('./db');
var crypto = require('crypto');
var User = require('../schemas/userSchema');


    exports.tripSummary = function(req, res){
         var post=req.body;
		     var db =dbobj.db;
         db.collection('tripSummary').save(post, function(err, result){
		        if (err) 
              return console.log(err)
              res.status(200);
              res.json({ message: 'Saved to database successfully' });
		     })
    };
    
    exports.getTripSummary = function(req, res){
        var db =dbobj.db;
        db.collection('tripSummary').find().toArray(function(err,results){
            res.set('Content-Type', 'application/json');
            res.send(results);
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

    exports.postUser = function(req, res){
        if (req.body.first_name &&
            req.body.last_name &&
            req.body.email &&
            req.body.username &&
            req.body.password &&
            req.body.passwordConf) {

        var userData = {
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf
          };

       
           var db =dbobj.db;
           db.collection('users').save(userData, function(error, result){
              if (error) 
                return console.log(error)
                res.status(200);
                res.json({ message: 'Saved to database successfully' });
           });
        
      }
    };
    