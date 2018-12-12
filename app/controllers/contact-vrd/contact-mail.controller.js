const nodemailer = require('nodemailer');

exports.sendMessage = (res) => {
    console.log("inside send email message controller"+res);
    let mailOptions = {
      from: 'ashishguptawaiting@gmail.com',
      to: 'ashishguptawaiting@gmail.com',
      subject: 'Notification from VRD-Network contact page',
      html: '<p><b>That was easy! BOLD {{ res.phone_no}}</b></p>'
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
  };