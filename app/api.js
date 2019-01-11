var myServices= require('./controllers/myServices.Controller.js');
var contactController= require('./controllers/contact-vrd/contact.controller');
var careerController= require('./controllers/career-vrd/career.controller');
var employeeController= require('./controllers/employee-vrd/employee.controller');
var google = require('./config/auth');
const Window = require('window');
/**
* Routes
*/
module.exports = function(app,passport) {
	const window = new Window();
	app.post('/truck/tripSummary', myServices.postTripSummary);
	app.get('/truck/tripSummary', myServices.getTripSummary);
	app.get('/register/user', myServices.getUser);
	app.post('/register/user', myServices.postUser);
	app.get('/register/users/count', myServices.getUsersCount);

	app.post('/application/careerVrd', careerController.postCareer);
	app.post('/application/contactVrd', contactController.postContact);
	//app.post('/application/employee', google.urlGoogle);
	app.post('/application/auth', employeeController.authEmployee);
	app.post('/application/logout', employeeController.logout);

	app.get('/auth/google',employeeController.googleAuth);
    app.get('/auth/google/callback',employeeController.googleAuthCallback);
}