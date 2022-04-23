export class CustomSequelizeError {
    constructor(this,message,status){
        this.name = 'CustomSequelizeError';
        this.message = message;
        this.status = status;
        this.stack = (new Error()).stack;
    }

    static handleErrors(err){
      const errors = ['SequelizeUniqueConstraintError'];
      const messages = [{"message":"email or name must be unique","status":409}];
      errors.forEach((error,index)=>{
        if(err.name===error){
            throw new CustomSequelizeError(messages[index].message,messages[index].status)
        }
      })
    };
};
 
