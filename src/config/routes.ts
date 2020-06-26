import { NextFunction, Request, Response, Router } from 'express';
import { MyServicesController } from '../controllers/myServices.controller';
import { UserController } from '../controllers/user-public/user.controller';
import { ExpressResponse, messageToSent } from '../model/express-response';
import { CareerController } from '../controllers/career-vrd/career.controller';
import { EmployeeController } from '../controllers/employee-vrd/employee.controller';
var passport12 =require('passport');
export default class Routes {

    public router: Router;
    app;
    passport;
    EmployeeController:any;
    /*--------  Constructor  --------*/


    constructor(app,passport) {
        // Set router
        this.router = Router();
        // Set app
        this.app = app;
        this.passport = passport;
        this.EmployeeController = new EmployeeController();
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
        const careerControllerRouter = new CareerController(this.passport).router;
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

        this.app.use(this.router.get('/auth/google', this.EmployeeController.googleAuth));
        this.app.use(this.router.get('/auth/google/callback',
                                        this.passport.authenticate('google', {
                                            failureRedirect: '/auth/fail'
                                        }),
                                        (req, res) =>{
                                            console.log("hello *****")
                                            var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
                                            responseHTML = responseHTML.replace('%value%', JSON.stringify({
                                                user: req.user
                                            }));
                                            res.status(200).send(responseHTML);
            }
            )
        )
        // this.app.post('/application/managementVrd',middleware.lookupAccessToken, managementController.postManagement); //should be authenticate before posting
        // this.app.put('/application/managementVrd',middleware.lookupAccessToken, managementController.putManagement);//should be authenticate before posting
        // this.app.get('/application/managementVrd', managementController.getManagement);
        // this.app.delete('/application/managementVrd/delete/:id', middleware.lookupAccessToken, managementController.deleteManagement);//should be authenticate before deleting

        // this.app.post('/application/jobVrd',middleware.lookupAccessToken,jobController.postJob); //should be authenticate before posting
        // this.app.get('/application/jobVrd',jobController.getJob);
        // this.app.delete('/application/jobVrd/delete/:id', middleware.lookupAccessToken,jobController.deleteJob);//should be authenticate before deleting
        // this.app.put('/application/jobVrd',middleware.lookupAccessToken,jobController.putJob);//should be authenticate before posting

        /*--------  Main routes  --------*/
        //this.app.use('/swagger-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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