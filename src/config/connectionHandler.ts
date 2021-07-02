import * as mongoose from "mongoose";
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
        const options = { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        };
        this.connection = mongoose.createConnection('mongodb+srv://test:test@myappdatabase12.tmhxb.mongodb.net/myappdatabase12?retryWrites=true&w=majority', options);
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
        connection.model(accessTokenSchema.name,accessTokenSchema.schema);
        connection.model(careerSchema.name,careerSchema.schema);
        connection.model(contactSchema.name,contactSchema.schema);
        connection.model(employeeSchema.name,employeeSchema.schema);
        connection.model(jobBoardSchema.name,jobBoardSchema.schema);
        connection.model(managementSchema.name,managementSchema.schema);
    }
}
