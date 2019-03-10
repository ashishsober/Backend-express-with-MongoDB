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
        res.req.body.applicants = response._doc;
        res.req.body.application.message = "Successfully Saved";
        res.req.body.application.response_action = "continue";
        res.status(201);
        res.json(res.req.body).end();
        //contactMail.sendMessage(response);
    }, (error) => {
        res.req.body.application.message = error.message;
        res.req.body.application.response_action = "hard";
        res.status(400);
        res.json(res.req.body).end();
    });
}

function updateDataCall(req, res, next) {
    var myquery = {
        _id: req.body.applicants._id
    };
    Management.updateOne(myquery, {
        $set: req.body.applicants
    }, function (error, result) {
        if (error) {
            res.req.body.application.message = error.message;
            res.req.body.application.response_action = "hard";
            res.status(400);
            res.json(res.req.body).end();
        } else {
            console.log(result.nModified + " document(s) updated");
            res.req.body.application.message = "Successfully Saved";
            res.req.body.application.response_action = "continue";
            res.status(201);
            res.json(res.req.body).end();
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