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
        console.log("**** Going to make DB connection ****");
        try {
            this.connection =  await mongoose.connect(DBURL.PROD_URL, options);
            console.log(`connection established successfully`);
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
