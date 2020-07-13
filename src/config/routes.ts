import { NextFunction, Request, Response, Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { ExpressResponse, messageToSent } from '../model/express-response';

export default class Routes {

    public router: Router;
    app;
    /*--------  Constructor  --------*/


    constructor(app) {
        // Set router
        this.router = Router();
        // Set app
        this.app = app;
        // Set all routes
        this.setAllRoutes();
    }


    /*--------  Methods  --------*/

    /**
     * Set all app routes
     */
    setAllRoutes() {      
        /*-------- Create Router and export its configured Express.Router ------*/
        const userControllerRouter = new UserController().router;
        /*--------  Set all custom routes here  --------*/


        this.app.use("/register",userControllerRouter)
        

        // Set main route for any other route found
        // this.setMainRoute();
    }

    
    /**
     * Set main route
     * this route will be used for all other routes not found before
     */
    private setMainRoute() {

        // All other routes should redirect to the index.html
        this.app.route('/*').get(this.index);
    }

    /**
     * Main route
     */
    private index(req: Request, res: Response, next: NextFunction) {
        // Error response
        const message = new messageToSent("Requested API not exist","hard","stop");
        const response = new ExpressResponse(message, 500);
        res.status(response.status).json(response);
    }

}