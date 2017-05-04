const userController= require('../controllers/user.Register.Controller.js');
/**
* Routes
*/
module.exports = function(app) {
	app.post('/auth/registration', userController.register);
	app.get('/register/user', userController.getUser);
}
