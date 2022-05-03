const sequelizeErrors = {
  errors:['SequelizeUniqueConstraintError','SequelizeForeignKeyConstraintError'],
  msgPessoas: [
    {"message":"Email and Name must be unique!","status":409}, 
  ],
  msgAnimais:[
    {"message":"Name of Animal already exists!","status":409}, 
    {"message":"Id of Pessoa not found!","status":404}
  ],
  msgLotes:[
    {"message":"Name of Lote already exists!","status":409},
  ],
  msgAnimalLote:[
    "NoUniqueField",
    {"message":"Id of Animal or Lote not found!","status":404}
  ]
};
export class CustomSequelizeError {
    constructor(this,message,status){
        this.name = 'CustomSequelizeError';
        this.message = message;
        this.status = status;
        this.stack = (new Error()).stack;
    }

    static handleErrors(err,model){
      const { errors, msgAnimais, msgPessoas, msgLotes, msgAnimalLote } = sequelizeErrors;
      errors.forEach((error,index)=>{
        const reference = model==='Animal'? msgAnimais:
                          model==='Lote'? msgLotes:
                          model==='AnimalLote'?
                          msgAnimalLote : msgPessoas;
        if(err.name===error){
            throw new CustomSequelizeError(reference[index].message,reference[index].status)
        }
      })
    };
};
 
