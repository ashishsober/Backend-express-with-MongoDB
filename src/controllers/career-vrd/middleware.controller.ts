import { NextFunction, Response, Request } from "express";
import accessTokenSchema from "../../schemas/accessToken";


export class MiddlewareController {
    constructor(){ }
    
    lookupAccessToken = async(req:Request,res:Response,next:NextFunction )=> {
        const schema = accessTokenSchema.name;
        const collection = res.locals.db.model(schema);
        console.log("inside middleware");
        collection.find({
            accessToken: req.headers.authorization
        }, (error, result) => {
            if (error) {
                res.status(400);
                res.json(error).end();
            } else {
                if (result.length === 1 && req.body.client != undefined) {
                        req.body.client.accessToken = result[0].accessToken;
                        req.body.client.id = result[0].id;
                        next();
                        //findUid(responseToSend, res);
                } else if(result.length === 1){
                      next();
                } else {
                    res.req.body.application.message =  "Authentication Failed";
                    res.req.body.application.response_action= "hard";
                    res.status(401).send(res.req.body);
                }
            }
        });
    }
}