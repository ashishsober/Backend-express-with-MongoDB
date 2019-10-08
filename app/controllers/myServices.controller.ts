import { Request, Response, Router } from 'express';
import { ExpressResponse } from '../config/routes';
//var Trip = require('../schemas/tripSchema');
import Trip from '../schemas/tripSchema';
//var User = require('../schemas/userSchema');

export class MyServicesController {
    response: ExpressResponse;
    router:Router;
    //log: Logger;
    //responseHandler: ResponseHandler;
    
    constructor() {
        console.log('EnrollmentConfigController');
        this.router = Router();
        this.router.get('/', this.getTripSummary)
    }


    getTripSummary = async(req:Request, res:Response)=> {
        const collection = global["custom"]["connection"].get("VRD").model(Trip.name); //SHOULD GET MOVED TO EXPRESS
        collection.find(function (err, results) {
            res.set('Content-Type', 'application/json');
            res.send(results);
        })
    };

    // getUser = (req:Request, res:Response) => {
    //     User.find(function (err, results) {
    //         res.set('Content-Type', 'application/json');
    //         res.send(results);
    //     })
    // };

}