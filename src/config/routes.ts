import { NextFunction, Request, Response, Router } from 'express';
import { ExpressResponse, messageToSent } from '../model/express-response';
import { userDetailsController } from '../controllers/userDetailsController';
// import { ManagementController } from '../controllers/career-vrd/Management.controller';
// import { JobBoardController } from '../controllers/career-vrd/jobBoard.controller';

export default class Routes {

    public router: Router;
    app;
    // passport;
    /*--------  Constructor  --------*/


    constructor(app) {
        // Set router
        this.router = Router();
        // Set app
        this.app = app;
        // this.passport = passport;
        // Set all routes
        this.setAllRoutes();
    }


    /*--------  Methods  --------*/

    /**
     * Set all app routes
     */
    setAllRoutes() {      
        /*-------- Create Router and export its configured Express.Router ------*/
        const careerControllerRouter = new userDetailsController().router;
        
        /*--------  Set all custom routes here  --------*/


        // this.app.use(this.passport.initialize());
        // this.app.use(this.passport.session())
        this.app.use('/application', careerControllerRouter);

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