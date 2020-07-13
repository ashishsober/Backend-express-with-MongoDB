import * as mongoose from "mongoose";
import userSchema from "../schemas/userSchema";
import truckSchema from "../schemas/truckSchema";
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
            autoReconnect: true, 
            reconnectTries: 30, 
            useFindAndModify: false, 
            useUnifiedTopology: true,
            useCreateIndex: true
        };
        // mongodb://test:test@ds131747.mlab.com:31747/truckbypass
        this.connection = mongoose.createConnection('mongodb://test:test123@ds131747.mlab.com:31747/truckbypass', options);
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
        connection.model(userSchema.name, userSchema.schema);
        connection.model(truckSchema.name, truckSchema.schema);
    }
}
