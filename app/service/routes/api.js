var userController= require('../controllers/user.Register.Controller.js');
/**
* Routes
*/
module.exports = function(app) {
	app.post('/truck/tripSummary', userController.tripSummary);
	app.get('/truck/tripSummary', userController.getTripSummary);
	app.get('/register/user', userController.getUser);
}
