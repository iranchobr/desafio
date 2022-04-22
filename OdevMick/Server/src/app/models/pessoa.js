import { Sequelize, DataTypes, Model } from "sequelize";
const options = require("./../../config/database.js");
const sequelize = new Sequelize(options);

export class Pessoa extends Model {
  static associate(models){
    Pessoa.hasMany(models.Animal);
  }
};

Pessoa.init({
  id:{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    primaryKey:true
  },
  no_pessoa:{
    type:DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  no_email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
  },
  endereco:{
    type:DataTypes.STRING
  },
  sexo:{
    type:DataTypes.ENUM('M','F')
  },
  ic_ativo:{
    type:DataTypes.BOOLEAN
  },
},{
  sequelize,
  modelName:'Pessoa',
  tableName:'pessoas',
  timestamps:false,
});

