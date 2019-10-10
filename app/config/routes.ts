import { NextFunction, Request, Response, Router } from 'express';
import { MyServicesController } from '../controllers/myServices.controller';
import { UserController } from '../controllers/user-public/user.controller';

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
        const userController = new UserController().router;
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
        this.app.use("/register",userController)
        //this.app.get('/register/user', this.myServicesController.getUser);
        //this.app.post('/register/user', myServices.postUser);
        //this.app.get('/register/users/count', myServices.getUsersCount);

        // this.app.post('/application/careerVrd', careerController.postCareer);
        // this.app.post('/application/contactVrd', contactController.postContact);
        // this.app.get('/register/contact', contactController.getContact);
        // this.app.post('/application/auth', middleware.lookupAccessToken ,employeeController.findUid);
        // this.app.post('/application/logout', employeeController.logout);

        // this.app.get('/auth/google', employeeController.googleAuth);
        // this.app.get('/auth/google/callback',
        // this.passport.authenticate('google', {
        //     failureRedirect: '/auth/fail'
        // }),
        //     function (req, res) {
        //         var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
        //         responseHTML = responseHTML.replace('%value%', JSON.stringify({
        //             user: req.user
        //         }));
        //         res.status(200).send(responseHTML);
        //     }
        // );


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
        this.setMainRoute();
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
        const response = new ExpressResponse("Requested API not exist", 500);
        res.status(response.status).json(response);
    }

}


export class ExpressResponse {

    constructor(message:string,status:number,payload?:any) {
        this.message = message ? message : undefined;
        this.status = status ? status : undefined;
        this.payload = payload ? Object.keys(payload).length ? payload:undefined : undefined;
    }

    message;
    status;
    payload;
}