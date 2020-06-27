import { Request, Response, Router } from 'express';
import managementSchema from '../../schemas/managementSchema';
import { ExpressResponse } from '../../model/express-response';
import { MongoRepository } from '../../repository/mongo.repository';
import { MiddlewareController } from '../middleware.controller';

export class ManagementController {
    repository: MongoRepository;
    router: Router;

    constructor() {
        this.router = Router();
        this.repository = new MongoRepository();

        this.router.post('/managementVrd', new MiddlewareController().lookupAccessToken, this.postManagement); //should be authenticate before posting
        this.router.put('/managementVrd', new MiddlewareController().lookupAccessToken, this.putManagement);//should be authenticate before posting
        this.router.get('/managementVrd', this.getManagement);
        this.router.delete('/managementVrd/delete/:id', new MiddlewareController().lookupAccessToken, this.deleteManagement);//should be authenticate before deleting

    }
    postManagement = async (req, res, next) => {
        const schema = managementSchema.name;
        const response = await this.repository.save(res, schema, req.body);
        if (response instanceof Error) {
            res.req.body.application.message = response.message;
            res.req.body.application.response_action = "hard";
            res.status(400);
            res.json(res.req.body).end();
        } else {
            res.req.body.applicants = response._doc;
            res.req.body.application.message = "Successfully Saved";
            res.req.body.application.response_action = "continue";
            res.status(201);
            res.json(res.req.body).end();
        }
    };

    putManagement = async (req, res, next) => {
        console.log("inside put method");
        const schema = managementSchema.name;
        var myquery = {
            _id: req.body.applicants._id
        };
        const response = await this.repository.findOneAndUpdate(res, schema, myquery, req.body);
        if (response instanceof Error) {
            res.req.body.application.message = response.message;
            res.req.body.application.response_action = "hard";
            res.status(400);
            res.json(res.req.body).end();
        } else {
            res.req.body.application.message = "Successfully Saved";
            res.req.body.application.response_action = "continue";
            res.status(201);
            res.json(res.req.body).end();
        }
    }


    getManagement = async (req, res) => {
        const schema = managementSchema.name;
        const response = await this.repository.find(res, schema);
        if (response instanceof Error) {
            res.send(response);
        }
        else {
            res.send(response);
        }
    };

    deleteManagement = async (req, res) => {
        const schema = managementSchema.name;
        const filter = {
            _id: req.params['id']
        }
        const response = await this.repository.findOneAndDelete(res, schema, filter);
        if (response instanceof Error) {
            res.send(response);
        }
        else {
            res.send(response);
        }
    }
}