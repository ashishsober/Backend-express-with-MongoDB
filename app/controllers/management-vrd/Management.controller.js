'use strict';
const Management = require('../../schemas/managementSchema');

let myObj = {
    applicants: {},
    application: {
        "message": "",
        "response_action": ""
    },
    client:{}
};

exports.postManagement = (req, res, next) => {
    if (req.body.applicants._id === "" || req.body.applicants._id === null) {
        saveData(req, res, next);

    } else {
        updateDataCall(req, res, next);
    }

};

function saveData(req, res, next) {
    var ManagementNew = new Management();
    ManagementNew.name = req.body.applicants.name;
    ManagementNew.emailid = req.body.applicants.emailid;
    ManagementNew.profileImage = req.body.applicants.profileImage;
    ManagementNew.position = req.body.applicants.position;
    ManagementNew.discription = req.body.applicants.discription;
    var promise = ManagementNew.save();
    promise.then((response) => {
        myObj.applicants = response._doc;
        myObj.application.message = "Successfully Saved";
        myObj.application.response_action = "continue";
        res.status(201);
        res.json(myObj).end();
        //contactMail.sendMessage(response);
    }, (error) => {
        myObj.application.message = error.message;
        myObj.application.response_type = "hard";
        myObj.application.response_action = "stop";
        res.status(400);
        res.json(myObj).end();
    });
}

function updateDataCall(req, res, next) {
    var myquery = {
        _id: req.body._id
    };
    Management.updateOne(myquery, {
        $set: req.body
    }, function (error, result) {
        if (error) {
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

exports.getManagement = function (req, res) {
    Management.find(function (err, results) {
        res.set('Content-Type', 'application/json');
        res.send(results);
    })
};

exports.deleteManagement = function (req, res) {
    Management.deleteOne({
        _id: req.params['id']
    }, (error, result) => {
        if (error) {
            res.set('Content-Type', 'application/json');
            res.send(error);
        } else {
            res.set('Content-Type', 'application/json');
            res.send(result);
        }
    });
}