'use strict';
const Contact = require('../../schemas/contactSchema');
const contactMail = require('./contact-mail.controller');

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
        contactMail.sendMessage(response);
    },(error) => {
        myObj.application.message = error.message;
        myObj.application.response_type = "hard";
        myObj.application.response_action = "stop";
        res.status(400);
        res.json(myObj).end();
    });
};