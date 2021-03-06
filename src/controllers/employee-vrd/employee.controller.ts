const Employee = require('../../schemas/employeeSchema');
const access = require('../../schemas/accessToken');
var passport = require('passport');
var google = require('../../config/auth');

export class EmployeeController {


    googleAuth = (req, res, next) => {
        console.log("at google auth");
        passport.authenticate('google', {
            access_type: 'offline',
            prompt: 'consent',
            session: false,
            scope: ['profile', 'email']
        })(req, res, next);
    }


    //save the login user details in our database for the future reference
    postEmployee = (profileData, done) => {
        console.log("inside post employee");
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
            this.setAccesstoken(profileData, done);
        }, (error) => {
            /****  no need to save if it is duplicate.
             create a session in backend with the userid,createdDate and the access token to the access token table
            *****/
            if (error.code === 11000 || error.code === 11001) {
                this.setAccesstoken(profileData, done);
            }
            // else {
            //     res.status(400);
            //     res.json(error).end();
            // }
        });
    };


    //saving access token to database
    setAccesstoken(profileData, done) {
        let accessToken = new access();
        let date = new Date();
        accessToken.accessToken = profileData.accessToken;
        accessToken.creationTime = date;
        accessToken.id = profileData.id;
        var promise = accessToken.save();
        promise.then((result) => {
            console.log("----------Created accessToken successfully----------------");
            return true;
        }, (error) => {
            if (error.code === 11000 || error.code === 11001) {
                console.log("access token already present need to delete")
                this.deleteAccessToken(profileData, done);
            } else {
                return false;
            }
        });
    };

    //deleting the previous accessToken and inserting the new one
    deleteAccessToken = (profileData, done) => {
        access.deleteOne({
            id: profileData.id
        }, (error, result) => {
            if (error) {
                return false;
            } else {
                console.log("-----Deleted accessToken successfully---- ");
                this.setAccesstoken(profileData, done);
            }
        });
    }


    findUid = (req, res) => {
        Employee.find({
            uid: req.body.client.id
        }, (error, result) => {
            if (error) {
                res.status(400);
                res.json(error).end();
            } else {
                console.log("finded the user id in employee table---");
                res.req.body.application.message = "Successfully Authenticated";
                res.req.body.application.response_action = "continue";
                res.req.body.client.emails[0].value = result[0]._doc.email;
                res.req.body.client.photos[0].value = result[0]._doc.photoURL;
                res.req.body.client.displayName = result[0]._doc.displayName;
                res.status(201).send(res.req.body);
            }
        });
    };



    logout = (req, res) => {
        access.deleteOne({
            accessToken: req.body.client.accessToken
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

}