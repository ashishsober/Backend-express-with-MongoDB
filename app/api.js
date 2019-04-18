var myServices = require('./controllers/myServices.Controller.js');
var contactController = require('./controllers/contact-vrd/contact.controller');
var careerController = require('./controllers/career-vrd/career.controller');
var employeeController = require('./controllers/employee-vrd/employee.controller');
var managementController = require('./controllers/management-vrd/Management.controller');
var middleware = require('./controllers/middleware.controller');
var jobController = require('./controllers/job-board-vrd/jobBoard.controller');
/**
 * Routes
 */
module.exports = function (app, passport) {
	app.use(passport.initialize());
	app.use(passport.session())
	app.post('/truck/tripSummary', myServices.postTripSummary);
	app.get('/truck/tripSummary', myServices.getTripSummary);
	app.get('/register/user', myServices.getUser);
	app.post('/register/user', myServices.postUser);
	app.get('/register/users/count', myServices.getUsersCount);

	app.post('/application/careerVrd', careerController.postCareer);
	app.post('/application/contactVrd', contactController.postContact);
	app.get('/register/contact', contactController.getContact);
	app.post('/application/auth', middleware.lookupAccessToken ,employeeController.findUid);
	app.post('/application/logout', employeeController.logout);

	app.get('/auth/google', employeeController.googleAuth);
	app.get('/auth/google/callback',
		passport.authenticate('google', {
			failureRedirect: '/auth/fail'
		}),
			function (req, res) {
				var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
				responseHTML = responseHTML.replace('%value%', JSON.stringify({
					user: req.user
				}));
				res.status(200).send(responseHTML);
			}
		);


	app.post('/application/managementVrd',middleware.lookupAccessToken, managementController.postManagement); //should be authenticate before posting
	app.put('/application/managementVrd',middleware.lookupAccessToken, managementController.putManagement);//should be authenticate before posting
	app.get('/application/managementVrd', managementController.getManagement);
	app.delete('/application/managementVrd/delete/:id', middleware.lookupAccessToken, managementController.deleteManagement);//should be authenticate before deleting

	app.post('/application/jobVrd',middleware.lookupAccessToken,jobController.postJob); //should be authenticate before posting
	app.get('/application/jobVrd',jobController.getJob);
	app.delete('/application/jobVrd/delete/:id', middleware.lookupAccessToken,jobController.deleteJob);//should be authenticate before deleting
}