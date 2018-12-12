const nodemailer = require('nodemailer');
const fs =require('fs');
const handlebars = require('handlebars');
var aws     = require('aws-sdk');



exports.sendMessage = (data) => {
    console.log("inside send email message controller--"+data);
    aws.config.loadFromPath(__dirname + '/config.json');
    // Instantiate SES.
    var ses = new aws.SES();
  console.log("my SES---"+ses);
    let transporter = nodemailer.createTransport({
      service: 'email-smtp.us-east-1.amazonaws.com',
      host: 'ec2-3-16-206-69.us-east-2.compute.amazonaws.com',
      port: 465,
      secure: true,
      auth: {
        user: 'AKIAIP2H7RCAZVW2X7MA',
        pass: 'AocFgMGTnXv8chQAVwUb+gTeoAr3ey0tR4UeMVWSUe7w'
      }
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
        //console.log("my html"+html);
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
            console.log("Error in sending mail"+error);
            } else {
            console.log('Email sent: ' + info.response);
            }
         });
    });
  };