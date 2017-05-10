var myServices= require('../controllers/myServices.Controller.js');
/**
* Routes
*/
module.exports = function(app) {
	app.post('/truck/tripSummary', myServices.tripSummary);
	app.get('/truck/tripSummary', myServices.getTripSummary);
	app.get('/register/user', myServices.getUser);
}
