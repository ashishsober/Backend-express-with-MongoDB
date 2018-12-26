import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import ContactController from './controllers/contact/contact.controller';

class Server {

  public app:express.Application;

  constructor(){
    this.app = express();
    this.config();
    this.routes();
  }


  routes(){
     let router:express.Router;
     router = express.Router();
     this.app.use('/',router);
     this.app.use('/application/contactVrd', ContactController);

  }


  
  config(){
    //mongosse connectivity
   let configDB = {
      'url' : 'mongodb://localhost:27017/data',
      'prod_url':'mongodb://test:test@ds145128.mlab.com:45128/myappdatabase12'
    };
    mongoose.connect(configDB.prod_url, { useMongoClient: true });
    
    //config
    this.app.use(bodyParser.urlencoded({extended:true}))
    this.app.use(bodyParser.json());
    this.app.use(helmet);
    this.app.use(logger('dev'));
    this.app.use(cors());
  }
}

export default new Server().app;

