var express = require('express');
var mongo = require('./app/service/controllers/db.js');
var bodyParser = require('body-parser');
var validator =require('express-validator');
var cors = require('cors');
/**
* Data Parsing
*/
	var app = express();
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(bodyParser.json());
		app.use(express.static(__dirname));
		app.use(cors());
		app.use(validator());

  

require('./app/service/routes/api.js')(app);

/**
* Creating the server
*/
var port = process.env.port || 3000;
var server = app.listen(port, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("App listening at http://%s:%s", host, port)
});

