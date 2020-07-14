import { Request, Response, Router } from 'express';
import { MongoRepository } from '../repository/mongo.repository';
import truckSchema from '../schemas/truckSchema';
import userSchema from '../schemas/userSchema';

export class TruckController {
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

    constructor(){
        this.router = Router();
        this.repository = new MongoRepository();
        this.router.post('/truck', this.postTruck);
        this.router.post('/listOfTruck', this.listOfTruck);
    }

    postTruck = async (req: Request, res: Response) =>{
        const schema = truckSchema.name;
        const collection = res.locals.db.model(schema);
        const collectionData = new collection(req.body);

        const response = await this.repository.save(res, schema, collectionData);
        if(response instanceof Error){
            throw response;
        }
        else {
            this.updateUser(req, res,response);
        }
    }

    updateUser = async (req: Request, res: Response,truckData:any) =>{
        const schema = userSchema.name;
        const filter = {
            "uid":truckData.uid
        }
        const data = { $push: { "ownerOf": {
                truck_id:truckData._id,
                truck_no:truckData.truck_no
            }
         } 
        }
        

        const response = await this.repository.findOneAndUpdate(res,schema,filter,data);
        if(response instanceof Error){
            throw response;
        }
        else {
            res.send(response);
        }
    }

    listOfTruck = async (req: Request, res: Response) =>{
        const schema = truckSchema.name;
        const filter = {
            "uid":req.body.uid
        }
        const response = await this.repository.find(res,schema,filter);
        if(response instanceof Error){
            throw response;
        }
        else {
            res.send(response);
        }
    }
}