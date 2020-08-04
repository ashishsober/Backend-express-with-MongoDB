import { Request, Response, Router } from 'express';
import { MongoRepository } from '../repository/mongo.repository';
import userSchema from '../schemas/userSchema';
import { ExpressResponse } from '../model/express-response';


export class UserController {
    repository: MongoRepository;
    router: Router;
    myObj = {
        applicants: "",
        application: {
            "message": "",
            "response_type": "",
            "response_action": ""
        }
    };

    constructor() {
        this.router = Router();
        this.repository = new MongoRepository();
        this.router.get('/user', this.getUser);
        this.router.get('/users/count',this.getUsersCount);
        this.router.post('/user',this.postUser);
        this.router.post('/user/loginStatusCheck',this.loginStatusCheck);
        this.router.post('/user/findUser',this.findUser);
    }

    getUser = async (req: Request, res: Response) => {
        const schema = userSchema.name;
        const response = await this.repository.find(res,schema);
        if(response instanceof Error){
            throw response;
        }
        else {
            res.send(response);
        }
    };

    postUser = async (req: Request, res: Response) => {
        console.log("at post method")
        const schema = userSchema.name;
        const response = await this.repository.findOneAndUpdate(res, schema, {uid:req.body.uid}, req.body);
        if(response instanceof Error){
            throw response;
        }
        else {
            res.send(response);
        }
    };

    getUsersCount = async (req:Request, res:Response) =>{
        const schema = userSchema.name;
        const collection = res.locals.db.model(schema);
        collection.find().count( (err:any, results:any) => {
            let obj = {
                count: results
            };
            res.send(obj);
        })
    };

    loginStatusCheck = async(req:Request,res:Response) => {
        console.log("at login check")
        const schema = userSchema.name;
        const filter = {
            "uid":req.body.uid,
            "signInStatus":req.body.signInStatus
        }
        const data = {
            updatedDate : new Date().toISOString()
        }
        const response = await this.repository.findOneAndUpdate(res,schema,filter,data);
        if(response instanceof Error){
            throw response;
        }
        else {
            res.send(response);
        }
    }

    findUser = async (req:Request,res:Response) =>{
        const schema = userSchema.name;
        const filter = {
            "email":req.body.email
        }
        const response = await this.repository.findOne(res,schema,filter);
        if(response instanceof Error){
            throw response;
        }
        else {
            res.send(response);
        }
    }
}