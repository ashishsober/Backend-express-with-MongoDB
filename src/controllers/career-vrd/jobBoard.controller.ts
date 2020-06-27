import { Request, Response, Router } from 'express';
import  jobBoardSchema from '../../schemas/jobBoardSchema';
import { ExpressResponse } from '../../model/express-response';
import { MongoRepository } from '../../repository/mongo.repository';
import { MiddlewareController } from './middleware.controller';

export class JobBoardController {
    repository: MongoRepository;
    router: Router;

    constructor(){
        this.router = Router();
        this.repository = new MongoRepository();

        this.router.post('/jobVrd',new MiddlewareController().lookupAccessToken,this.postJob); //should be authenticate before posting
        this.router.get('/jobVrd',this.getJob);
        this.router.delete('/jobVrd/delete/:id', new MiddlewareController().lookupAccessToken,this.deleteJob);//should be authenticate before deleting
        this.router.put('/jobVrd',new MiddlewareController().lookupAccessToken,this.putJob);//should be authenticate before posting

    }
    postJob = (req, res, next) => {
        if (req.body._id === "" || req.body._id === null) {
            this.saveData(req, res, next);
        } else {
            this.updateDataCall(req, res, next);
        }
    };

    getJob = async(req, res)=> {
        const schema = jobBoardSchema.name;
        const response = await this.repository.find(res, schema);
        if (response instanceof Error) {
            res.send(response);
        }
        else {
            res.send(response);
        }
    };
    
    saveData = async(req, res, next) =>{
        const schema = jobBoardSchema.name;
        const response = await this.repository.save(res, schema, req.body);
        if (response instanceof Error) {
            res.status(400);
            res.json(res.req.body).end();
        } else {
            res.status(201);
            res.json(res.req.body).end();
        }
    };
    
    updateDataCall = (req,res,next) => {
        console.log("data to update")
    }
    
    
    
    deleteJob= async(req, res) =>{
        const schema = jobBoardSchema.name;
        const filter =- {
            _id: req.params['id']
        };
        const response = await this.repository.findOneAndDelete(res, schema, filter);
        if (response instanceof Error) {
            res.send(response);
        }
        else {
            res.send(response);
        }
    }
    
    putJob = async(req, res, next) => {
        const schema = jobBoardSchema.name;
        var myquery = {
            _id: req.body._id
        };
        const response = await this.repository.findOneAndUpdate(res, schema, myquery, req.body);
        if (response instanceof Error) {
            res.status(400);
            res.json(res.req.body).end();
        } else {
            res.status(201);
            res.json(res.req.body).end();
        }
    }

}