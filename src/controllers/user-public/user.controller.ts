import { Request, Response, Router } from 'express';
import userSchema from '../../schemas/userSchema';
import { ExpressResponse } from '../../model/express-response';
import { MongoRepository } from '../../repository/mongo.repository';


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
        this.router.post('/user',this.postUser);
        this.router.get('/users/count',this.getUsersCount);
    }

    getUser = async (req: Request, res: Response) => {
        const schema = userSchema.name;
        console.log("my getUser data ****",schema);
        const response = await this.repository.find(res,schema);
        if(response instanceof Error){
            throw response;
        }
        else {
            res.send(response);
        }
    };

    postUser = async (req: Request, res: Response) => {
        const schema = userSchema.name;
        const collection = res.locals.db.model(schema);
        const collectionData = new collection(req.body);
        collectionData.save((error:any, result:any) => {
            if (error) {
                this.myObj.application.message = error.message;
                this.myObj.application.response_type = "hard";
                this.myObj.application.response_action = "stop";
                res.status(200);
                res.json(this.myObj);
            } else {
                this.myObj.applicants = result._doc;
                this.myObj.application.message = "Successfully Saved";
                this.myObj.application.response_type = "info";
                this.myObj.application.response_action = "continue";
                res.status(202);
                res.json(this.myObj);
            }
        });
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
}