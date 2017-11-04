var dbobj = require('./db');
//var crypto = require('crypto');
var User = require('../schemas/userSchema');


    exports.postTripSummary = function(req, res){
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
        User.find(function(err,results){
        	  res.set('Content-Type', 'application/json');
            res.send(results);
        })
    };





    exports.postUser = function(req, res){
       var newUser = new User();
        if (req.body.first_name &&
            req.body.last_name &&
            req.body.email &&
            req.body.username &&
            req.body.password &&
            req.body.passwordConf) {

        
            newUser.first_name=req.body.first_name;
            newUser.last_name=req.body.last_name;
            newUser.email= req.body.email;
            newUser.username= req.body.username;
            newUser.password= req.body.password;
            newUser.passwordConf= req.body.passwordConf;
         

       
          
           newUser.save(function(error, result){
              if (error) 
                return console.log(error)
                res.status(200);
                res.json({ message: 'Saved to database successfully' });
           });
        
      }
    };
    
    