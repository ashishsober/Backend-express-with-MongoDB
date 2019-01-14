'use strict';
const Employee = require('../../schemas/employeeSchema');
const access = require('../../schemas/accessToken');
var passport = require('passport');
var google = require('../../config/auth');


exports.googleAuth = (req, res, next) => {
    passport.authenticate('google', {
        access_type: 'offline',
        prompt: 'consent',
        session: false,
        scope: ['profile', 'email']
    })(req, res, next);
}

exports.googleAuthCallback = (req, res, next) => {
    passport.authenticate('google', (error, user_data) => {
        res.status(201).json(user_data);
    })(req, res, next);
}



//save the login user details in our database for the future reference
exports.postEmployee = (profileData,done) => {
    let newEmployee = new Employee();
    let date = new Date();
    newEmployee.displayName = profileData.displayName;
    newEmployee.email = profileData.emails[0].value;
    newEmployee.photoURL = profileData.photos[0].value
    newEmployee.uid = profileData.id;
    newEmployee.creationTime = date;
    newEmployee.providerId =profileData.provider;
    var promise = newEmployee.save();
    promise.then((result) => {
        console.log("successfuuly created");
        setAccesstoken(profileData,done);
    }, (error) => {
        /****  no need to save if it is duplicate.
         create a session in backend with the userid,createdDate and the access token to the access token table
        *****/
        if (error.code === 11000 || error.code === 11001) {
            setAccesstoken(profileData,done);
        } else {
            res.status(400);
            res.json(error).end();
        }
    });
};


//saving access token to database
function setAccesstoken(profileData,done) {
    let accessToken = new access();
    let date = new Date();
    accessToken.accessToken = profileData.accessToken;
    accessToken.creationTime = date;
    accessToken.uid = profileData.id;
    var promise = accessToken.save();
    promise.then((result) => {
        console.log("----------Created accessToken successfully----------------");
        return true;
    }, (error) => {
        if (error.code === 11000 || error.code === 11001) {
            console.log("access token already present need to delete")
            deleteAccessToken(profileData,done);
        } else {
            return false;
        }
    });
};

//deleting the previous accessToken and inserting the new one
function deleteAccessToken(profileData) {
    access.deleteOne({
        uid: profileData.id
    }, (error, result) => {
        if (error) {
            return false;
        } else {
            console.log("-----Deleted accessToken successfully---- ");
            setAccesstoken(profileData);
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
            if (result.length === 1) {
                let responseToSend = {
                    accessToken: result[0]._doc.accessToken,
                    id: result[0]._doc.uid,
                    emailId: "",
                    photoUrl: "",
                    message: "Successfully Authenticated",
                    responseAction: "info"
                }
                findUid(responseToSend, res);
            } else {
                let responseToSend = {
                    accessToken: "",
                    id: "",
                    emailId: "",
                    photoUrl: "",
                    message: "Authentication Failed",
                    responseAction: "hard"
                }
                res.status(201).send(responseToSend);
            }

        }
    })
};

function findUid(responseToSend, res) {
    Employee.find({
        uid: responseToSend.id,
    }, (error, result) => {
        if (error) {
            res.status(400);
            res.json(error).end();
        } else {
            console.log("finded the user id in employee table---" + result);
            responseToSend.emailId = result[0]._doc.email;
            responseToSend.photoUrl = result[0]._doc.photoURL;
            res.status(201).send(responseToSend);
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