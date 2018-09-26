var User = require('../schemas/userSchema');
var Trip = require('../schemas/tripSchema');


let myObj = {
    applicants: "",
    application: {
        "message": "",
        "response_type": "",
        "response_action": ""
    }
};

exports.postTripSummary = function (req, res) {
    var newTrip = new Trip();
    newTrip.truckNo = req.body.truckNo;
    newTrip.status = req.body.status;

    newTrip.tripDetails.from = req.body.tripDetails.from;
    newTrip.tripDetails.to = req.body.tripDetails.to;
    newTrip.tripDetails.startDate = req.body.tripDetails.startDate;
    newTrip.tripDetails.endDate = req.body.tripDetails.endDate;

    newTrip.partyDetails.soldToParty = req.body.partyDetails.soldToParty;
    newTrip.partyDetails.contactDetails = req.body.partyDetails.contactDetails;
    newTrip.partyDetails.amount = req.body.partyDetails.amount;
    newTrip.partyDetails.paid = req.body.partyDetails.paid;

    newTrip.save(function (err, result) {
        if (err)
            return console.log(err)
        res.status(200);
        res.json({
            message: 'Saved to database successfully'
        });

    })

};




exports.getTripSummary = function (req, res) {
    Trip.find(function (err, results) {
        res.set('Content-Type', 'application/json');
        res.send(results);
    })
};




exports.getUser = function (req, res) {
    User.find(function (err, results) {
        res.set('Content-Type', 'application/json');
        res.send(results);
    })
};

exports.getUsersCount = function (req, res) {
    User.find().count(function (err, results) {
        let obj = {
            count: results
        };
        // res.set('Content-Type', 'text');
        // res.status(202);
        res.send(obj);
    })
};


exports.postUser = function (req, res) {
    var newUser = new User();

    if (req.body.first_name &&
        req.body.email &&
        req.body.mobile
    ) {
        newUser.first_name = req.body.first_name;
        newUser.last_name = req.body.last_name;
        newUser.email = req.body.email;
        newUser.mobile = req.body.mobile;
        newUser.pan_no = req.body.pan_no;


        newUser.save(function (error, result) {
            if (error) {
                myObj.application.message = error.message;
                myObj.application.response_type = "hard";
                myObj.application.response_action = "stop";
                res.status(200);
                res.json(myObj);
            } else {
                myObj.applicants = result._doc;
                myObj.application.message = "Successfully Saved";
                myObj.application.response_type = "info";
                myObj.application.response_action = "continue";
                res.status(202);
                res.json(myObj);
            }
        });

    }
};