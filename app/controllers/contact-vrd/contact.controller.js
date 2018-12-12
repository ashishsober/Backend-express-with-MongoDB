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

exports.postContact = (req, res, next) => {
    var newContact = new Contact();
    newContact.name = req.body.name;
    newContact.email = req.body.email;
    newContact.phone_no = req.body.phone_no;
    newContact.service = req.body.service;
    newContact.other = req.body.other;
    newContact.comment = req.body.comment;
    
    var promise = newContact.save();
    promise.then((response) => {
        myObj.applicants = response._doc;
        myObj.application.message = "Successfully Saved";
        myObj.application.response_type = "info";
        myObj.application.response_action = "continue";
        res.status(201);
        res.json(myObj).end();
        sendMessage(response);
    },(error) => {
        myObj.application.message = error.message;
        myObj.application.response_type = "hard";
        myObj.application.response_action = "stop";
        res.status(400);
        res.json(myObj).end();
    });
};


function sendMessage(res){
  let mailOptions = {
    from: 'ashishguptawaiting@gmail.com',
    to: 'ashishguptawaiting@gmail.com',
    subject: 'Notification from VRD-Network contact page',
    html: '<p><b>That was easy! BOLD</b></p>'
   };
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
}