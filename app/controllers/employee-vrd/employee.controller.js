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

// exports.googleAuthCallback = (req, res, next) => {
//     passport.authenticate('google', (error, user_data) => {
//         res.status(201).json(user_data);
//     })(req, res, next);
// }



//save the login user details in our database for the future reference
exports.postEmployee = (profileData, done) => {
    let newEmployee = new Employee();
    let date = new Date();
    newEmployee.displayName = profileData.displayName;
    newEmployee.email = profileData.emails[0].value;
    newEmployee.photoURL = profileData.photos[0].value
    newEmployee.uid = profileData.id;
    newEmployee.creationTime = date;
    newEmployee.providerId = profileData.provider;
    var promise = newEmployee.save();
    promise.then((result) => {
        console.log("successfuuly created");
        setAccesstoken(profileData, done);
    }, (error) => {
        /****  no need to save if it is duplicate.
         create a session in backend with the userid,createdDate and the access token to the access token table
        *****/
        if (error.code === 11000 || error.code === 11001) {
            setAccesstoken(profileData, done);
        } else {
            res.status(400);
            res.json(error).end();
        }
    });
};


//saving access token to database
function setAccesstoken(profileData, done) {
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
            deleteAccessToken(profileData, done);
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



//find the user is present or not in the access token table
// exports.authEmployee = (req, res) => {
//     let responseToSend = {
//         accessToken: "",
//         id: "",
//         emailId: "",
//         photoUrl: "",
//         displayName: "",
//         message: "",
//         responseAction: "",
//         action: ""
//     }
//     access.find({
//         uid: req.body.uid,
//         accessToken: req.body.accessToken
//     }, (error, result) => {
//         if (error) {
//             res.status(400);
//             res.json(error).end();
//         } else {
//             console.log("-------Finded the accesToken in the database---------");
//             if (result.length === 1) {
//                     responseToSend.accessToken=result[0]._doc.accessToken,
//                     responseToSend.id = result[0]._doc.uid;
//                     responseToSend.message = "Successfully Authenticated";
//                     responseToSend.responseAction= "info";
//                     responseToSend.action= "authenticated";
//                     findUid(responseToSend, res);
//             } else {
//                     responseToSend.message =  "Authentication Failed";
//                     responseToSend.responseAction= "hard";
//                     responseToSend.action= "authenticated";
//                     res.status(201).send(responseToSend);
//             }
//         }
//     })
// };


exports.findUid = (req, res) => {
    Employee.find({
        uid: req.body.client.uid
    }, (error, result) => {
        if (error) {
            res.status(400);
            res.json(error).end();
        } else {
            console.log("finded the user id in employee table---");
            res.req.body.application.message = "Successfully Authenticated";
            res.req.body.application.response_action= "continue";
            res.req.body.client.emailId = result[0]._doc.email;
            res.req.body.client.photoUrl = result[0]._doc.photoURL;
            res.req.body.client.displayName = result[0]._doc.displayName;
            res.status(201).send(res.req.body);
        }
    });
};



exports.logout = (req, res) => {
    let responseToSend = {
        accessToken: "",
        id: "",
        emailId: "",
        photoUrl: "",
        displayName: "",
        message: "",
        response_action: "",
        action: ""
    }
    access.deleteOne({
        uid: req.body.client.uid
    }, (error, result) => {
        if (error) {
            res.status(400);
            res.json(error).end();
        } else {
            console.log("successfully deleted the session from backend");
                res.req.body.application.message = "Successfully Logout",
                res.req.body.application.response_action = "logout",
            res.status(201);
            res.json(res.req.body).end();
        }
    });
};