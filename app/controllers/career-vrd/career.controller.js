'use strict';
const Career = require('../../schemas/careerSchema');



exports.postCareer = (req, res, next) => {

    let myObj = {
        applicants: "",
        application: {
            "message": "",
            "response_type": "",
            "response_action": "",
            "vrd_ref_number":""
        }
    };

    let newCareer = new Career(req.body);
    let d = new Date();
    let date = d.getDate();
    let dateStr =date.toString();
    let month = d.getMonth()+1;
    let monthStr = month.toString();
    let year = d.getFullYear();
    let yearStr = year.toString();
    let concat = dateStr.concat(monthStr);
    let dateinStr =concat.concat(yearStr);
    newCareer.vrd_ref_number ="VRD"+dateinStr+"001"
    
    var promise = newCareer.save();
    promise.then((response) => {
        myObj.applicants = response._doc;
        myObj.application.message = "Successfully Saved";
        myObj.application.response_type = "info";
        myObj.application.response_action = "continue";
        //myObj.application.vrd_ref_number = "VRD"+dateinStr+"1";
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