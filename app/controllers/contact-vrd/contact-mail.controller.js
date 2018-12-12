const nodemailer = require('nodemailer');
const fs =require('fs');
const handlebars = require('handlebars');
var aws = require('aws-sdk');



exports.sendMessage = (data) => {
    aws.config.loadFromPath(__dirname + '/../../../config.json');
    let transporter = nodemailer.createTransport({
        SES: new aws.SES({
            apiVersion: '2010-12-01'
        })
    });

    let readHTMLFile = function(path, callback) {
        fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };
     
    readHTMLFile(__dirname + '/contact-mail.html', function(err, html) {
        let template = handlebars.compile(html);
        var replacements = data;
        var htmlToSend = template(replacements);
        let mailOptions = {
            from: 'ashishguptawaiting@gmail.com',
            to: 'ashishguptawaiting@gmail.com',
            subject: 'Notification from VRD-Network contact page',
            html: htmlToSend
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
               console.log("Error in sending mail"+error.message);
            } else {
               console.log('Email sent: ' + info.envelope);
            }
        });
    });
  };
