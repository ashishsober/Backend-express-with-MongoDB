import * as http from 'http';
import Express from './config/express';
import * as dotenv from "dotenv";

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
        const env = dotenv.config({ path: "environment/.env." + process.env.NODE_ENV });
        this.port = this.normalizePort(process.env.PORT || '1337');
        this.startServer();
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


    private startServer() {
        //initialize Express app
        const expressApp = new Express().app;
        expressApp.set('port', this.port);

        //create server
        this.server = http.createServer(expressApp);
        this.server.listen(this.port);
        this.server.on('error', this.onError.bind(this));
        this.server.on('listening', this.onListening.bind(this));
    }

}

export default new Server();
