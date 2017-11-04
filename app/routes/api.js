var myServices= require('../controllers/myServices.Controller.js');
/**
* Routes
*/
module.exports = function(app) {
	app.post('/truck/tripSummary', myServices.postTripSummary);
	app.get('/truck/tripSummary', myServices.getTripSummary);
	app.get('/register/user', myServices.getUser);
	app.post('/register/user', myServices.postUser);
}
