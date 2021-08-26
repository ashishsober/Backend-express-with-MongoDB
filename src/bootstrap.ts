import * as http from 'http';
import Express from './config/express';
import * as dotenv from "dotenv";
import * as child from 'child_process';
import * as https from 'https';
import * as fs from 'fs';
// const env = dotenv.config({ path: "environment/.env." + process.env.NODE_ENV });
/*--------  Start App  --------*/
export class Server {
    server;
    port;

    constructor() {
        global["custom"] = {};
        global["custom"]["connection"] = '00';
        this.initializeServer();
    }

    initializeServer() {
        this.port = this.normalizePort(process.env.PORT || '1200');
        this.startServer();
        //console.log("mongoodb username ***",child.execSync(`echo $MONGO_DB_USERNAME`).toString().trim())
        //const decypt: Decryption = new Decryption();
        //decypt.key = env.parsed[CloudEnvironment.KEY];
    }

    /**
     * Normalize port
     * @param {*} val 
     */
    private normalizePort(val: number | string): number | string | boolean {
        const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port)) return val;
        else if (port >= 0) return port;
        else return false;
    }

    /**
     * On error
     * callback event for createServer error
     * @param {*} error 
     */
    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') throw error;
        const bind = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;
        switch (error.code) {
            case 'EACCES':
                console.log(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.log(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * On listening
     * callback event for createServer listening
     */
    private onListening() {
        const addr = this.server.address();
        const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        console.log(`Listening on ${bind}`);
    }

    // private getValueFromBashFile = (env: any, value: string, cloudConfigProp: string) => {
    //     return env.parsed[cloudConfigProp] ? env.parsed[cloudConfigProp] : child.execSync(`echo $${value}`).toString().trim();
    // }

    private startServer() {
        //initialize Express app
        const expressApp = new Express().app;
        expressApp.set('port', this.port);
        // console.log("localhost env variables",env);

        // read cert files
        this.server = http.createServer(expressApp);
        this.server.listen(this.port);

        // const CERT_LOC = this.getValueFromBashFile(env, "CERT_LOC", "CERT_LOC");
        // const CERT_KEY = this.getValueFromBashFile(env, "CERT_KEY", "CERT_KEY");
        // const CERT_PASS = this.getValueFromBashFile(env, "CERT_PASS", "CERT_PASS");
        // if(CERT_LOC && CERT_PASS) {
        //     var certKey = CERT_LOC + CERT_KEY;
        //     var certPass = CERT_LOC + CERT_PASS;
        //     var privateKey = fs.readFileSync(certKey, 'utf8');
        //     var certificate = fs.readFileSync(certPass, 'utf8');
        //     var credentials = { key: privateKey, cert: certificate };
        //     //create server
        //     this.server = https.createServer(credentials, expressApp);
        //     this.server.listen(8443);
        // }
        this.server.on('error', this.onError.bind(this));
        this.server.on('listening', this.onListening.bind(this));
    }

}

export default new Server();
