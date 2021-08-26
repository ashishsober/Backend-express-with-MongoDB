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
        const options:any = { 
            useNewUrlParser: true, 
            autoReconnect: true, 
            reconnectTries : 30, 
            useFindAndModify: false, 
            useUnifiedTopology: true, 
            readPreference: 'primaryPreferred',
            socketTimeoutMS: 0,
            keepAlive: true,
            poolSize: 10,
            ssl: false
        };
        console.log("****** Going to make DB connection *******");
        try {
            this.connection =  await mongoose.connect(DBURL.replicaset, options);
            console.log(`******************************************************`);
            console.log(`*** connection established successfully to mongodb ***`);
            console.log(`******************************************************`);
            global["custom"]["connection"].set("VRD", this.connection);
            this.serializeModels(this.connection);
        } catch (error) {
            console.log(error);
        }
    }

    private serializeModels(connection) {
        connection.model(userSchema.name, userSchema.schema);
        connection.model(truckSchema.name, truckSchema.schema);
    }
}
