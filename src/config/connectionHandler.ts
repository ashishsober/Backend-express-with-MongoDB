import * as mongoose from "mongoose";
import userSchema from "../schemas/userSchema";
import truckSchema from "../schemas/truckSchema";
import { DBURL } from "./auth";
export default class ConnectionHandler {

    connection;
    constructor() {
        //this.log = new Logger('Connection Handler');
        //this.cloudConfig = configurations;
        this.connectToDb();
        global["custom"]["connection"] = new Map();
    }
    
   /**
    * Connect to mongo
    */
    private async connectToDb() {
        const options = { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        };
        console.log("*** Going to make DB connection ***");
        this.connection =  mongoose.createConnection(DBURL.PROD_URL, options);
        this.connectionHandler(this.connection);
    }

    /*
        Handles and logs different stages of connections
        Add any connection related promise event here
    */
    private connectionHandler(connection) {
        //global["custom"]["connection"].set("VRD", connection);
        //this.serializeModels(connection);
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
