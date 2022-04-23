export class CustomSequelizeError {
    constructor(this,message,status){
        this.name = 'CustomValidationError';
        this.message = message;
        this.status = status;
        this.stack = (new Error()).stack;
    }
};
