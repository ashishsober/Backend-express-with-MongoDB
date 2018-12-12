const nodemailer = require('nodemailer');
const fs =require('fs');
const handlebars = require('handlebars');

exports.sendMessage = (data) => {
    console.log("inside send email message controller--"+data);
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ashishguptawaiting@gmail.com',
        pass: 'anjanibhai1@lux1'
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
        console.log("my html"+html);
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
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
         });
    });
  };