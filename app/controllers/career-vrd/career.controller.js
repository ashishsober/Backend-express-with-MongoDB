'use strict';
const Career = require('../../schemas/careerSchema');

let myObj = {
    applicants: "",
    application: {
        "message": "",
        "response_type": "",
        "response_action": "",
        "vrd_ref_number":""
    }
};

exports.postCareer = (req, res, next) => {
    var newCareer = new Career(req.body);
    
    var promise = newCareer.save();
    promise.then((response) => {
        myObj.applicants = response._doc;
        myObj.application.message = "Successfully Saved";
        myObj.application.response_type = "info";
        myObj.application.response_action = "continue";
        res.status(201);
        res.json(myObj).end();
        contactMail.sendMessage(response);
    },(error) => {
        myObj.application.message = error.message;
        myObj.application.response_type = "hard";
        myObj.application.response_action = "stop";
        res.status(400);
        res.json(myObj).end();
    });
};