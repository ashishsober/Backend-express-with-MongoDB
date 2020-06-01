import { Router, Request, Response, NextFunction } from "express";
import careerSchema from "../../schemas/careerSchema";

export class CareerController {
    router: Router;
    constructor() {
        this.router = Router();
        this.router.post('/',this.postCareer);
    }


    postCareer = async (req: Request, res: Response, next: NextFunction) => {
        let myObj = req.body;
        const schema = careerSchema.name;
        const collection = res.locals.db.model(schema);
        if (myObj.application.stage === 'bd' && myObj.applicants.vrd_ref_number === '') {
            collection.find().count(function (err, results) {
                console.log("my total count" + results);
                this.saveDataCall(results, req, res, myObj);
            });
        } else if (myObj.application.stage === 'ad' && myObj.applicants.vrd_ref_number !== '') {
            this.updateDataCall(myObj, req, res);
        } else {
            res.status(201);
            res.json(myObj).end();
        }

    };


    saveDataCall(count, req: Request, res: Response, myObj) {
        const schema = careerSchema.name;
        const collection = res.locals.db.model(schema);
        //let newCareer = new Career(req.body.applicants);
        const collectionData = new collection(req.body.applicants);
        let d = new Date();
        let date = d.getDate();
        let dateStr = date.toString();
        let month = d.getMonth() + 1;
        let monthStr = month.toString();
        let year = d.getFullYear();
        let yearStr = year.toString();
        let concat = dateStr.concat(monthStr);
        let dateinStr = concat.concat(yearStr);
        let totalCount = count + 1;
        let totalCountStr = totalCount.toString();
        collectionData.vrd_ref_number = "VRD" + dateinStr + "00" + totalCountStr;

        var promise = collectionData.save();
        promise.then((response) => {
            myObj.applicants = response._doc;
            myObj.application.message = "Successfully Saved";
            myObj.application.response_type = "info";
            myObj.application.response_action = "continue";
            res.status(201);
            res.json(myObj).end();
            //contactMail.sendMessage(response);
        }, (error) => {
            myObj.application.message = error.message;
            myObj.application.response_type = "hard";
            myObj.application.response_action = "stop";
            res.status(400);
            res.json(myObj).end();
        });
    };


    updateDataCall(myObj, req:Request, res:Response) {
        const schema = careerSchema.name;
        const collection = res.locals.db.model(schema);
        var myquery = { vrd_ref_number: myObj.applicants.vrd_ref_number };
        collection.updateOne(myquery, { $set: myObj.applicants }, (error, result) => {
            if (error) {
                myObj.application.message = error.message;
                myObj.application.response_type = "hard";
                myObj.application.response_action = "stop";
                res.status(400);
                res.json(myObj).end();
            } else {
                console.log(result.nModified + " document(s) updated");
                myObj.application.message = "Successfully Saved";
                myObj.application.response_type = "info";
                myObj.application.response_action = "continue";
                res.status(201);
                res.json(myObj).end();
            }
        });

    };
}