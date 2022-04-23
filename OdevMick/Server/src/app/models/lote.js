import { Sequelize, DataTypes, Model } from 'sequelize';
const options = require("./../../config/database.js");
const sequelize = new Sequelize(options);

export class Lote extends Model{
  static associate(models){
    Lote.belongsToMany(models.Animal, { 
    through:'animais_lotes',
    foreignKey:'fk_id_lote'
  });
  }
};

Lote.init({
  id: { 
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  no_lote: {
    type: DataTypes.STRING,
    allowNull:false,
    unique: true
  },
  ds_lote: {
    type: DataTypes.STRING,
  },
},
  {
  sequelize,
  modelName: 'Lote',
  tableName: 'lotes',
  timestamps:false,
});

