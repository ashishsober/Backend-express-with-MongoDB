import { NextFunction, Request, Response, Router } from 'express';
import { MyServicesController } from '../controllers/myServices.controller';
import { UserController } from '../controllers/user-public/user.controller';
import { ExpressResponse, messageToSent } from '../model/express-response';
import { CareerController } from '../controllers/career-vrd/career.controller';
import { ManagementController } from '../controllers/career-vrd/Management.controller';
import { JobBoardController } from '../controllers/career-vrd/jobBoard.controller';
export default class Routes {

    public router: Router;
    app;
    passport;
    /*--------  Constructor  --------*/


    constructor(app,passport) {
        // Set router
        this.router = Router();
        // Set app
        this.app = app;
        this.passport = passport;
        // Set all routes
        this.setAllRoutes();
    }


    /*--------  Methods  --------*/

    /**
     * Set all app routes
     */
    setAllRoutes() {      
        /*-------- Create Router and export its configured Express.Router ------*/
        const myServicesControllerRouter = new MyServicesController().router;
        const userControllerRouter = new UserController().router;
        const careerControllerRouter = new CareerController().router;
        const managementControllerRouter = new ManagementController().router;
        const JobBoardControllerRouter = new JobBoardController().router;
        /*--------  Set all custom routes here  --------*/


        // 
        // Your routes goes here
        //this.app.use(RouterConfig.DEFAULT, this.router);
      
        //this.app.use(RouterConfig.DEFAULT, this.router);          
        //this.app.use(RouterConfig.DOCUMENT, fileUploadRouter);
        //this.app.use(RouterConfig.ENROLLMENT, enrollmentConfigRouter);


        this.app.use(this.passport.initialize());
        this.app.use(this.passport.session())
        this.app.use("/truck/tripSummary", myServicesControllerRouter);
        this.app.use("/register",userControllerRouter)
        this.app.use('/application', careerControllerRouter);
        this.app.use(this.router.get('/auth/google', this.googleAuth));
        this.app.use(this.router.get('/auth/google/callback',
                                        this.passport.authenticate('google', {
                                            failureRedirect: '/auth/fail'
                                        }),
                                        (req, res) =>{
                                            var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
                                            responseHTML = responseHTML.replace('%value%', JSON.stringify({
                                                user: req.user
                                            }));
                                            res.status(200).send(responseHTML);
            }
            )
        )
        this.app.use('/application',managementControllerRouter); //should be authenticate before posting

        this.app.use('/application',JobBoardControllerRouter); //should be authenticate before posting
        // this.app.get('/application/jobVrd',jobController.getJob);
        // this.app.delete('/application/jobVrd/delete/:id', middleware.lookupAccessToken,jobController.deleteJob);//should be authenticate before deleting
        // this.app.put('/application/jobVrd',middleware.lookupAccessToken,jobController.putJob);//should be authenticate before posting


        // Set main route for any other route found
        // this.setMainRoute();
    }

    googleAuth = (req, res, next) => {
        console.log("at google auth");
        this.passport.authenticate('google', {
            access_type: 'offline',
            prompt: 'consent',
            session: false,
            scope: ['profile', 'email']
        })(req, res, next);
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