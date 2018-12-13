'use strict';
const Career = require('../../schemas/careerSchema');



exports.postCareer = (req, res, next) => {
    let myObj = req.body;
    if(myObj.application.stage ==='bd' && myObj.applicants.vrd_ref_number === ''){
        Career.find().count(function (err, results) {
            saveDataCall(results,req,res,myObj);
        });
    } else {
        console.log(req.body.application.vrd_ref_number);
        res.status(201);
        res.json(myObj).end();
    }
    
};

function saveDataCall(count,req,res, myObj){
    let newCareer = new Career(req.body.applicants);
    let d = new Date();
    let date = d.getDate();
    let dateStr =date.toString();
    let month = d.getMonth()+1;
    let monthStr = month.toString();
    let year = d.getFullYear();
    let yearStr = year.toString();
    let concat = dateStr.concat(monthStr);
    let dateinStr =concat.concat(yearStr);
    let totalCount = count+1;
    let totalCountStr =totalCount.toString();
    newCareer.vrd_ref_number ="VRD"+dateinStr+"00"+totalCountStr;

    var promise = newCareer.save();
    promise.then((response) => {
        myObj.applicants = response._doc;
        myObj.application.message = "Successfully Saved";
        myObj.application.response_type = "info";
        myObj.application.response_action = "continue";
        res.status(201);
        res.json(myObj).end();
        //contactMail.sendMessage(response);
    },(error) => {
        myObj.application.message = error.message;
        myObj.application.response_type = "hard";
        myObj.application.response_action = "stop";
        res.status(400);
        res.json(myObj).end();
    });
};