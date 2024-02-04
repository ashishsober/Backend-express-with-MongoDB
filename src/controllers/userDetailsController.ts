
import { Router, Request, Response, NextFunction } from "express";
import { MongoRepository } from "../config/mongo.repository";
import userDetailSchema from "../schemas/userDetailSchema";

export class userDetailsController {
    router: Router;
    repository: MongoRepository;

    constructor() {
        this.router = Router();
        this.repository = new MongoRepository();

        // this.router.post('/managementVrd', new MiddlewareController().lookupAccessToken, this.postManagement); //should be authenticate before posting
        this.router.get('/userDetails', this.getUserDetails);
        this.router.get('/userDetails/v1', this.getUserDetails);
    }


    getUserDetails = async (req, res) => {
        const schema = userDetailSchema.name;
        const response = await this.repository.find(res, schema);
        if (response instanceof Error) {
            res.send(response);
        }
        else {
            res.send(response);
        }
    };
}
