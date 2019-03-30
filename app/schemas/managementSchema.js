var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var managementSchema = new mongoose.Schema({
  emailid: {
    type: String,
    trim: true
  },
  profileImage: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  position: {
    type: String,
    trim: true
  },
  discription: {
    type: String,
    trim: true
  },
  creationTime: {
    type: Date,
    trim: true
  }
}, {
  versionKey: false // You should be aware of the outcome after set to false
});

var Management = mongoose.model('management', managementSchema);
module.exports = Management;