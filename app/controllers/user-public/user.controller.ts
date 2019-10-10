import { Request, Response, Router } from 'express';
import { ExpressResponse } from '../../config/routes';
import userSchema from '../../schemas/userSchema';


export class UserController {
    resposnse: ExpressResponse;
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
        this.router.get('/user', this.getUser);
        this.router.post('/user',this.postUser);
        this.router.get('/users/count',this.getUsersCount)
    }

    getUser = async (req: Request, res: Response) => {
        const schema = userSchema.name;
        const collection = res.locals.db.model(schema);
        collection.find((err:any, results:any) =>{
            res.set('Content-Type', 'application/json');
            res.send(results);
        });
    };

    postUser = async (req: Request, res: Response) => {
        const schema = userSchema.name;
        const collection = res.locals.db.model(schema);

        if (req.body.first_name &&
            req.body.email &&
            req.body.mobile
        ) {
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
}