var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var employeeSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  photoURL: {
    type: String,
    trim: true
  },
  displayName: {
    type: String,
    trim: true
  },
  providerId: {
    type: String,
    trim: true
  },
  uid: {
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

var Employee = mongoose.model('employee', employeeSchema);
module.exports = Employee;