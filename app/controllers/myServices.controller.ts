import { Request, Response, Router } from 'express';
import { ExpressResponse } from '../config/routes';
import Trip from '../schemas/tripSchema';

export class MyServicesController {
    response: ExpressResponse;
    router: Router;
    //log: Logger;
    //responseHandler: ResponseHandler;

    constructor() {
        this.router = Router();
        this.router.get('/', this.getTripSummary);
        this.router.post('/', this.postTripSummary)
    }


    getTripSummary = async (req: Request, res: Response) => {
        const schema = Trip.name;
        const collection = res.locals.db.model(schema);//SHOULD GET MOVED TO EXPRESS 
        collection.find((err:any, results:any) => {
            res.set('Content-Type', 'application/json');
            res.send(results);
        })
    };

    postTripSummary = async (req: Request, res: Response) => {
        const schema = Trip.name;
        const collection = res.locals.db.model(schema);
        const collectionData = new collection(req.body);
        collectionData.save((err:any, result:any) => {
            if (err)
                return console.log(err)
            res.status(200);
            res.json({
                message: 'Saved to database successfully'
            });

        })
    };
}