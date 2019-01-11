'use strict';
const Employee = require('../../schemas/employeeSchema');
const access = require('../../schemas/accessToken');
var passport =require('passport');
var google = require('../../config/auth');


exports.googleAuth = (req, res,next) => { 
    passport.authenticate('google',{ scope: ['profile']})(req, res, next);
   // res.status(201);
    // res.send('you hit the authentication endpoint\n');
}

exports.googleAuthCallback = (req, res,next) => { 
    passport.authenticate('google', (error,user_data) => {
        console.log(error,user_data);
        res.status(201).json(user_data);
    })(req, res, next);
}




exports.postEmployee = (req, res, next) => {
    let newEmployee = new Employee(req.body.providerData[0]);
    let date = new Date();
    newEmployee.creationTime = date;
    var promise = newEmployee.save();
    promise.then((result) => {
        setAccesstoken(req, res);
    }, (error) => {
        /****  no need to save if it is duplicate.
         create a session in backend with the userid,createdDate and the access token to the access token table
        *****/
        if (error.code === 11000 || error.code === 11001) {
            setAccesstoken(req, res);
        } else {
            res.status(400);
            res.json(error).end();
        }
    });
};


//saving access token to database
function setAccesstoken(req, res) {
    let accessToken = new access();
    let date = new Date();
    accessToken.accessToken = req.body.stsTokenManager.refreshToken;
    accessToken.creationTime = date;
    accessToken.uid = req.body.providerData[0].uid;
    var promise = accessToken.save();
    promise.then((result) => {
        console.log("----------Created accessToken successfully----------------");
        let responseToSend = {
            accessToken:result.accessToken,
            uid:result.uid,
            email:req.body.providerData[0].email,
            photoURL:req.body.providerData[0].photoURL
        }
        res.status(201);
        res.json(responseToSend).end();
    }, (error) => {
        if (error.code === 11000 || error.code === 11001) {
            console.log("access token already present need to delete")
            deleteAccessToken(req, res);
        } else {
            res.status(400);
            res.json(error).end();
        }
    });
};

//deleting the previous accessToken and inserting the new one
function deleteAccessToken(req, res) {
    access.deleteOne({
        uid: req.body.providerData[0].uid
    }, (error, result) => {
        if (error) {
            res.status(400);
            res.json(error).end();
        } else {
            console.log("-----Deleted accessToken successfully---- ");
            setAccesstoken(req, res);
        }
    });
}




















exports.authEmployee = (req, res) => {
    access.find({
        uid: req.body.uid,
        accessToken: req.body.accessToken
    }, (error, result) => {
        if (error) {
            res.status(400);
            res.json(error).end();
        } else {
            console.log("-------Finded the accesToken in  the database---------");
            if(result.length === 1) {
                let responseToSend = {
                    accessToken:result[0]._doc.accessToken,
                    uid:result[0]._doc.uid,
                    email:"",
                    photoURL:"",
                    message:"Successfully Authenticated",
                    responseAction:"info"
                }
                findUid(responseToSend,res);
            } else {
                let responseToSend = {
                    accessToken:"",
                    uid:"",
                    email:"",
                    photoURL:"",
                    message:"Authentication Failed",
                    responseAction:"hard"
                }
                res.status(201);
                res.json(responseToSend).end();
            }
            
        }
    })
};

function findUid(responseToSend, res){
    Employee.find({
        uid:responseToSend.uid,
    }, (error, result) => {
        if (error) {
            res.status(400);
            res.json(error).end();
        } else {
            console.log("finded the user id in employee table---"+result);
            responseToSend.email = result[0]._doc.email;
            responseToSend.photoURL = result[0]._doc.photoURL;
            res.status(201);
            res.json(responseToSend).end();
        }
    });
    
};

exports.logout = (req, res) => {
    access.deleteOne({
        uid: req.body.uid
    }, (error, result) => {
        if (error) {
            res.status(400);
            res.json(error).end();
        } else {
            console.log("successfully deleted the session");
            res.status(201);
            res.json(result).end();
        }
    });
};