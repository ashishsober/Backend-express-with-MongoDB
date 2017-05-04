var express = require('express');
var mongo = require('./app/service/controllers/db.js');
var bodyParser = require('body-parser');
var validator =require('express-validator');
var cors = require('cors');
var debug = require('debug')('Backend-Express-with-mongoDB:server.js');
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
var port = normalizePort(process.env.PORT || '80');
app.set('port', port);


var server = app.listen(port, function () {
	var host = server.address().address
	console.log("App listening at http://%s:%s", host, port)
});

server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


/**
 * Event listener for HTTP server.js "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}



/**
 * Event listener for HTTP server.js "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
