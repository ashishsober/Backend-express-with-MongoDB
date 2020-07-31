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
        this.router.post('/updateTruckData',this.updateTruck)
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
            res.send(response);
        }
    }
        

    //     const response = await this.repository.findOneAndUpdate(res,schema,filter,data);
    //     if(response instanceof Error){
    //         throw response;
    //     }
    //     else {
    //         res.send(response);
    //     }
    // }

    listOfTruck = async (req: Request, res: Response) =>{
        const schema = truckSchema.name;
        const filter = {
            "owner_uid":req.body.uid
        }
        const response = await this.repository.find(res,schema,filter);
        if(response instanceof Error){
            throw response;
        }
        else {
            res.send(response);
        }
    }

    updateTruck = async (req:Request, res:Response) => {
        const schema = truckSchema.name;
        const filter = {
                        "truck_no":req.body.truck_no
                     }
        const data ={
            truck_current_status:req.body.trip_status
        }             
        const response = await this.repository.findOneAndUpdate(res,schema,filter,data);
        if(response instanceof Error){
            throw response;
        }
        else {
            //call user colection to update as this driver is got the notification from the owner ,so he will be the drive of this owner and the truck
            this.updateUser(req,res,response)
        }

    }

     updateUser = async (req: Request, res: Response,truckData:any) =>{
        const schema = userSchema.name;
        const filter = {
            "email":truckData.driver_emailId
        }
        const data = { 
            driverOf: {
                truck_id:truckData._id,
                truck_no:truckData.truck_no,
                owner_uid:truckData.owner_uid
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
}