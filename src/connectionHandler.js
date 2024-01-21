"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
// import accessTokenSchema from "../schemas/accessToken";
// import careerSchema from "../schemas/careerSchema";
// import contactSchema from "../schemas/contactSchema";
// import employeeSchema from "../schemas/employeeSchema";
// import jobBoardSchema from "../schemas/jobBoardSchema";
// import managementSchema from "../schemas/managementSchema";
var url = "mongodb+srv://ashishwork16:5jTLG5tbkrAjpJWD@cluster0.rhut5cb.mongodb.net/khata";
var ConnectionHandler = /** @class */ (function () {
    function ConnectionHandler() {
        console.log('Connection Handler');
        //this.cloudConfig = configurations;
        this.initializeConnectionManager();
    }
    /**
     * Connect to mongo
     */
    ConnectionHandler.prototype.initializeConnectionManager = function () {
        this.connectToDb();
        global["custom"]["connection"] = new Map();
    };
    /*
        Define connections here
        New Tenant details should be added here
    */
    ConnectionHandler.prototype.connectToDb = function () {
        var options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        };
        this.connection = mongoose.createConnection(url);
        this.connectionHandler(this.connection);
    };
    /*
        Handles and logs different stages of connections
        Add any connection related promise event here
    */
    ConnectionHandler.prototype.connectionHandler = function (connection) {
        connection.on('error', function (err) {
            console.log("unable to connect");
            if (err)
                throw err;
        });
        connection.once('open', function (callback) {
            console.log("connection established successfully !!!");
            global["custom"]["connection"].set("VRD", connection);
            //serialize model on connection
            // this.serializeModels(connection);
        });
        connection.on('reconnected', function () {
            console.log("connection is reconnected");
        });
        connection.on('disconnected', function (err) {
            connection.close();
            process.exit(0);
        });
    };
    return ConnectionHandler;
}());
exports.default = ConnectionHandler;
