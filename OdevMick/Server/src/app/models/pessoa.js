import { Sequelize, DataTypes, Model } from "sequelize";
import { Animal } from "./animal.js";
const options = require("./../../config/database.js");
const sequelize = new Sequelize(options);

class Pessoa extends Model {};

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
  tableName:'pessoas'
});
Pessoa.hasMany(Animal);
Animal.belongsTo(Pessoa,{
  foreignKey:"fk_id_pessoa",
  onUpdate:'CASCADE',
  onDelete:'CASCADE'
});







