'use strict';
const Contact = require('../../schemas/contactSchema');
const nodemailer = require('nodemailer')

let myObj = {
    applicants: "",
    application: {
        "message": "",
        "response_type": "",
        "response_action": ""
    }
};
let mailOptions = {
    from: 'ashishguptawaiting@gmail.com',
    to: 'laxmi.singh887@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};
exports.postContact = (req, res) => {
    var newContact = new Contact();
    newContact.name = req.body.name;
    newContact.email = req.body.email;
    newContact.phone_no = req.body.phone_no;
    newContact.service = req.body.service;
    newContact.other = req.body.other;
    newContact.comment = req.body.comment;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ashishguptawaiting@gmail.com',
          pass: 'anjanibhai1@lux1'
        }
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
    var promise = newContact.save();
    promise.then((response) => {
        myObj.applicants = response._doc;
        myObj.application.message = "Successfully Saved";
        myObj.application.response_type = "info";
        myObj.application.response_action = "continue";

        res.status(201);
        res.json(myObj);
    },(error) => {
        myObj.application.message = error.message;
        myObj.application.response_type = "hard";
        myObj.application.response_action = "stop";
        res.status(400);
        res.json(myObj);
    });


    // newContact.save(function (error, result) {
    //     if (error) {
    //         myObj.application.message = error.message;
    //         myObj.application.response_type = "hard";
    //         myObj.application.response_action = "stop";
    //         res.status(400);
    //         res.json(myObj);
    //     } else {
    //         myObj.applicants = result._doc;
    //         myObj.application.message = "Successfully Saved";
    //         myObj.application.response_type = "info";
    //         myObj.application.response_action = "continue";
    //         res.status(201);
    //         res.json(myObj);
    //     }

    // });

};