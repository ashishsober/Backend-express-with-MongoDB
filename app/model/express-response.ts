export class ExpressResponse {
    msg:messageToSent;
    status:number;
    payload:any;

    constructor(message:messageToSent,status:number,payload?:any) {
        Object.assign(this.msg ,message);
        this.status = status ? status : undefined;
        this.payload = payload ? Object.keys(payload).length ? payload:undefined : undefined;
    }
}

export class messageToSent {
    message:string;
    response_type:string;
    response_action:string;

    constructor(message:string,type:string,action:string){
        this.message = message;
        this.response_type = type;
        this.response_action = action;
    }
}