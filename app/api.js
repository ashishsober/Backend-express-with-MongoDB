var myServices= require('./controllers/myServices.Controller.js');
var contactController= require('./controllers/contact-vrd/contact.controller');
var careerController= require('./controllers/career-vrd/career.controller');
var employeeController= require('./controllers/employee-vrd/employee.controller');
/**
* Routes
*/
module.exports = function(app) {
	app.post('/truck/tripSummary', myServices.postTripSummary);
	app.get('/truck/tripSummary', myServices.getTripSummary);
	app.get('/register/user', myServices.getUser);
	app.post('/register/user', myServices.postUser);
	app.get('/register/users/count', myServices.getUsersCount);

	app.post('/application/careerVrd', careerController.postCareer);
	app.post('/application/contactVrd', contactController.postContact);
	app.post('/application/employee', employeeController.postEmployee);
	app.post('/application/auth', employeeController.authEmployee);
	app.post('/application/logout', employeeController.logout);
}
