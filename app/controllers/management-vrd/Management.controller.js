'use strict';
const Management = require('../../schemas/managementSchema');

let myObj = {
    applicants: "",
    application: {
        "message": "",
        "response_type": "",
        "response_action": ""
    }
};

exports.postManagement = (req, res, next) => {
    var ManagementNew = new Management(req.body);
     //Management.name = req.body.name;
    // Management.email = req.body.email;
    // Management.phone_no = req.body.phone_no;
    // Management.service = req.body.service;
    // Management.other = req.body.other;
    // Management.comment = req.body.comment;
    
    var promise = ManagementNew.save();
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





function updateDataCall(myObj,req,res){
    var myquery = {vrd_ref_number:myObj.applicants.vrd_ref_number};
    Career.updateOne(myquery,{ $set: myObj.applicants },function(error,result){
        if(error){
            myObj.application.message = error.message;
            myObj.application.response_type = "hard";
            myObj.application.response_action = "stop";
            res.status(400);
            res.json(myObj).end();
        } else {
            console.log(result.nModified + " document(s) updated");
            myObj.application.message = "Successfully Saved";
            myObj.application.response_type = "info";
            myObj.application.response_action = "continue";
            res.status(201);
            res.json(myObj).end();
        }
    });
}