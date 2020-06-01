import * as mongoose from "mongoose";
import tripSchema from "../schemas/tripSchema";
import userSchema from "../schemas/userSchema";
import accessTokenSchema from "../schemas/accessToken";
import careerSchema from "../schemas/careerSchema";
import contactSchema from "../schemas/contactSchema";
import employeeSchema from "../schemas/employeeSchema";
import jobBoardSchema from "../schemas/jobBoardSchema";
import managementSchema from "../schemas/managementSchema";
export default class ConnectionHandler {

    connection;
    constructor() {
        //this.log = new Logger('Connection Handler');
        //this.cloudConfig = configurations;
        this.initializeConnectionManager();
    }

    /**
     * Connect to mongo
     */
    private initializeConnectionManager() {
        this.connectToDb();
        global["custom"]["connection"] = new Map();
    }

    /* 
        Define connections here
        New Tenant details should be added here
    */
    private connectToDb() {
        const options = { useNewUrlParser: true, autoReconnect: true, reconnectTries: 30, useFindAndModify: false, useUnifiedTopology: true };
        this.connection = mongoose.createConnection('mongodb://test:test@ds145128.mlab.com:45128/myappdatabase12', options);
        this.connectionHandler(this.connection);
    }

    /*
        Handles and logs different stages of connections
        Add any connection related promise event here
    */
    private connectionHandler(connection) {
        connection.on('error', (err) => {
            console.log("unable to connect");
            if (err) throw err;
        });

        connection.once('open', callback => {
            console.log(`connection established successfully`);
            global["custom"]["connection"].set("VRD", connection);
            //serialize model on connection
            this.serializeModels(connection);
        });

        connection.on('reconnected', () => {
            console.log(`connection is reconnected`);
        });

        connection.on('disconnected', (err) => {
            connection.close();
            process.exit(0);
        });
    }

    private serializeModels(connection) {
        connection.model(tripSchema.name, tripSchema.schema);
        connection.model(userSchema.name, userSchema.schema);
        connection.model(accessTokenSchema.name,accessTokenSchema.schema);
        connection.model(careerSchema.name,careerSchema.schema);
        connection.model(contactSchema.name,contactSchema.schema);
        connection.model(employeeSchema.name,employeeSchema.schema);
        connection.model(jobBoardSchema.name,jobBoardSchema.schema);
        connection.model(managementSchema.name,managementSchema.schema);
    }
}
