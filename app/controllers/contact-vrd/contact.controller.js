var Contact = require('../../schemas/contactSchema');


let myObj = {
    applicants: "",
    application: {
        "message": "",
        "response_type": "",
        "response_action": ""
    }
};
exports.postContact = function (req, res) {
    var newContact = new Contact();
    newContact.name =req.body.name;
    newContact.email = req.body.email;
    newContact.phone_no = req.body.phone_no;
    newContact.service = req.body.service;
    newContact.other = req.body.other;
    newContact.comment = req.body.comment;
   
    newContact.save(function (error, result) {
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

    })

};