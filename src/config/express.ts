import * as bodyParser from "body-parser";
const cors = require('cors');
import express, {Express, Request, Response} from 'express';
// import Routes from "./routes";
import * as compression from 'compression';
//import Logger from "./logger";
import * as helmet from "helmet";
// var passport =require('passport');
import ConnectionHandler from "../connectionHandler";
import Routes from "./routes";
// import { googleConfig } from './auth';
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

export default class ExpressClass {

    //dotenv = dotenv.config({ path: "environment/.env." + process.env.NODE_ENV });
    //log = new Logger('express');
    app: express.Express;
    passport: any;
    constructor() {
        //console.log(this.dotenv);
        // Start App
        this.app = express();
        // Middleware
        this.setMiddleware();

        new ConnectionHandler();

        // Routes
        this.setRoutes();

    }


    /**
     * Set middleware
     */
    private setMiddleware() {

        // cors
        this.app.use(cors());

        // Add body parser
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
        // this.app.use(compression());
        // this.app.use(helmet());
        this.app.use(this.requestInterceptor(this));
    }

    private requestInterceptor(vm) {
        return (req, res, next) => {
            res["locals"]["db"] = global["custom"]["connection"].get("VRD");
            next();
        }
    }

    //middleware setup to check for tenant id and resolve i

    /**
     * Set routes
     */
    setRoutes() {
        // Create Routes, and export its configured Express.Router
        new Routes(this.app);
    }

}