import { Router, Request, Response, NextFunction } from "express";
import contact from '../../schemas/contactSchema';

class ContactController {
    router:Router;
    constructor(){
        this.router=Router();
        this.routes();
    }

    getContacts(req:Request,res:Response):void{
        contact.find({})
        .then((data)=>{
          let status = res.statusCode;
          res.json({status,data});
        })
        .catch((err) => {
            let status = res.statusCode;
            res.json({status,err});
        })
    }

    getContact(req:Request,res:Response):void{
        
    }

    createContact(req:Request,res:Response):void{
        
    }

    updateContact(req:Request,res:Response):void{
        
    }

    deleteContact(req:Request,res:Response):void{
        
    }


    routes() {
       this.router.get('/',this.getContacts);
    }
}

const ContactControllers = new ContactController();
ContactControllers.routes();

export default ContactControllers.router;