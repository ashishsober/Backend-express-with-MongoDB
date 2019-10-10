'use strict';
const jobBoardModel = require('../../schemas/jobBoardSchema');

exports.postJob = (req, res, next) => {
    if (req.body._id === "" || req.body._id === null) {
        saveData(req, res, next);
    } else {
        updateDataCall(req, res, next);
    }

};

function saveData(req, res, next) {
    var jobBoard = new jobBoardModel();
    jobBoard.title = req.body.title;
    jobBoard.location = req.body.location;
    jobBoard.jobType = req.body.jobType;
    jobBoard.jobId = req.body.jobId;
    jobBoard.experience = req.body.experience;
    jobBoard.requirements = req.body.requirements;
    var promise = jobBoard.save();
    promise.then((response) => {
        res.req.body = response._doc;
        //res.req.body.application.message = "Successfully Saved";
        //res.req.body.application.response_action = "continue";
        res.status(201);
        res.json(res.req.body).end();
    }, (error) => {
        //res.req.body.application.message = error.message;
        //res.req.body.application.response_action = "hard";
        res.status(400);
        res.json(res.req.body).end();
    });
};

function updateDataCall(req,res,next){
    console.log("data to update")
}

exports.getJob = function (req, res) {
    jobBoardModel.find(function (err, results) {
        res.set('Content-Type', 'application/json');
        res.send(results);
    })
};

exports.deleteJob= function (req, res) {
    jobBoardModel.deleteOne({
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

exports.putJob = (req, res, next) => {
    var myquery = {
        _id: req.body._id
    };
    jobBoardModel.updateOne(myquery, {
        $set: req.body
    }, function (error, result) {
        if (error) {
            res.status(400);
            res.json(res.req.body).end();
        } else {
            res.status(201);
            res.json(res.req.body).end();
        }
    });
}