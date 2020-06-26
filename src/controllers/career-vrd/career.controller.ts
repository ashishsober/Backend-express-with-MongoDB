import { Router, Request, Response, NextFunction } from "express";
import careerSchema from "../../schemas/careerSchema";
import contactSchema from "../../schemas/contactSchema";
import employeeSchema from "../../schemas/employeeSchema";
import accessTokenSchema from '../../schemas/accessToken';
import { MiddlewareController } from '../middleware.controller';
import { contactMailController } from '../contact-vrd/contact-mail.controller';
import { MongoRepository } from '../../repository/mongo.repository';
var passport = require('passport');

export class CareerController {
    router: Router;
    passportInstance:any;
    contactMail;
    repository:MongoRepository;
    myObj = {
        applicants: "",
        application: {
            "message": "",
            "response_type": "",
            "response_action": ""
        }
    };
    constructor(passportIns:any) {
        this.router = Router();
        this.passportInstance = passportIns;
        this.contactMail = new contactMailController();
        this.repository = new MongoRepository();
        // console.log("My Passpost instance", passportIns);
        this.router.post('/careerVrd',this.postCareer);
        this.router.post('/contactVrd', this.postContact);
        this.router.get('/contact', this.getContact);
        this.router.post('/auth', new MiddlewareController().lookupAccessToken ,this.findUid);
        this.router.post('/logout', this.logout);

        this.router.get('/google', this.googleAuth);
        this.router.get('/google/callback',this.passportInstance.authenticate('google', {
            failureRedirect: '/auth/fail'
          }),(req, res) =>{
                var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
                responseHTML = responseHTML.replace('%value%', JSON.stringify({
                    user: req.user
                }));
                res.status(200).send(responseHTML);
          });
    }


    postCareer = async (req: Request, res: Response, next: NextFunction) => {
        let myObj = req.body;
        const schema = careerSchema.name;
        const collection = res.locals.db.model(schema);
        if (myObj.application.stage === 'bd' && myObj.applicants.vrd_ref_number === '') {
            const response = await this.repository.find(res,schema);
            console.log("my total count" + response);
            this.saveDataCall(response, req, res, myObj);
        } else if (myObj.application.stage === 'ad' && myObj.applicants.vrd_ref_number !== '') {
            this.updateDataCall(myObj, req, res);
        } else {
            res.status(201);
            res.json(myObj).end();
        }

    };

    postContact = async (req, res, next) => {
        const schema = contactSchema.name;
        // const collectionData = new collection(req.body);
        const response = await this.repository.save(res,schema,req.body);
        if(response instanceof Error){
            this.myObj.application.message = response.message;
            this.myObj.application.response_type = "hard";
            this.myObj.application.response_action = "stop";
            res.status(400);
            res.json(this.myObj).end();
        } else {
            this.myObj.applicants = response._doc;
            this.myObj.application.message = "Successfully Saved";
            this.myObj.application.response_type = "info";
            this.myObj.application.response_action = "continue";
            res.status(201);
            res.json(this.myObj).end();
            // this.contactMail.sendMessage(response);
        }
    };

    getContact = async (req, res) =>{
        const schema = contactSchema.name;
        console.log("my contact data ****",schema);
        const response = await this.repository.find(res,schema);
        if(response instanceof Error){
            throw response;
        }
        else {
            res.send(response);
        }
    };


    saveDataCall = (count, req: Request, res: Response, myObj) =>{
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

    findUid = async(req, res) => {
        const schema = employeeSchema.name;
        // const response = await this.repository.find(res,schema);
        const Employee = res.locals.db.model(schema);
        Employee.find({
            uid: req.body.client.id
        }, (error, result) => {
            if (error) {
                res.status(400);
                res.json(error).end();
            } else {
                console.log("finded the user id in employee table---");
                res.req.body.application.message = "Successfully Authenticated";
                res.req.body.application.response_action= "continue";
                res.req.body.client.emails[0].value = result[0]._doc.email;
                res.req.body.client.photos[0].value = result[0]._doc.photoURL;
                res.req.body.client.displayName = result[0]._doc.displayName;
                res.status(201).send(res.req.body);
            }
        });
    };

    logout = (req, res) => {
        const schema = accessTokenSchema.name;
        const access = res.locals.db.model(schema);
        access.deleteOne({
            accessToken: req.body.client.accessToken
        }, (error, result) => {
            if (error) {
                res.status(400);
                res.json(error).end();
            } else {
                console.log("successfully deleted the session from backend");
                    res.req.body.application.message = "Successfully Logout",
                    res.req.body.application.response_action = "logout",
                res.status(201);
                res.json(res.req.body).end();
            }
        });
    };

    googleAuth = (req, res, next) => {
        console.log("At google auth method")
        passport.authenticate('google', {
            access_type: 'offline',
            prompt: 'consent',
            session: false,
            scope: ['profile', 'email']
        })(req, res, next);
    }
}