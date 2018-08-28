
const express = require('express');
const bodyParser = require('body-parser');
const validator =require('express-validator');
const cors = require('cors');
const debug = require('debug')('Backend-Express-with-mongoDB:server.js');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbobj = require('./controllers/db'); //u can see the database connection here




/**
* Data Parsing
*/
const app = express();
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(bodyParser.json());
		app.use(express.static(__dirname));
		app.use(cors());
		app.use(validator());
    
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(session({
            secret:'anystringoftext',
            saveUninitialized:true,
            resave:true
    }));

    // app.use('/',function(req,res){
    //   res.send("Our first express program");
    //   console.log(req.cookies);
    //   console.log('===============');
    //   console.log(req.session);
    // })
 




      //Here we can see the API'S
      require('./routes/api')(app); 



      /**
      * Creating the server
      */
     const port = normalizePort(process.env.PORT || '1337');
      app.set('port', port);


      const server = app.listen(port, function () {
      	const host = server.address().address
      	console.log("App listening at http://%s:%s", host, port)
      });

      server.on('error', onError);
      server.on('listening', onListening);





      /**
       * Normalize a port into a number, string, or false.
       */
      function normalizePort(val) {
        const port = parseInt(val, 10);

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
          const addr = server.address();
          var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
          debug('Listening on ' + bind);
        }
