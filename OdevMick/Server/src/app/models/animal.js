import { Sequelize,DataTypes, Model } from 'sequelize';
const options = require('./../../config/database.js');
const sequelize = new Sequelize(options);

export class Animal extends Model {
  static associate(models){
    Animal.belongsToMany(models.Lote,{ 
      through:'animais_lotes', 
      foreignKey:'fk_id_animal'
    });
    Animal.belongsTo(models.Pessoa,{
      foreignKey:"fk_id_pessoa",
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    });
  }
};

Animal.init({
    id:{
      type: DataTypes.BIGINT,
      autoIncrement:true,
      primaryKey:true,
    },
    fk_id_pessoa:{
      type: DataTypes.BIGINT,
      references:{
        model:{
          tableName:"pessoas"
        },
        key:'id'
      }
    },
    id_fazenda:{
      type: DataTypes.BIGINT,
      allowNull:false,
    },
    no_animal:{
      type:DataTypes.STRING,
      allowNull:false,
      unique: true
    },
    no_raca:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    sexo:{
      type:DataTypes.ENUM('M','F'),
      allowNull:false,
    },
    vr_peso:{
      type:DataTypes.FLOAT,
      allowNull:false,
    },
    dt_nascimento:{
      type:DataTypes.DATEONLY
    }
  },{
    sequelize,
    modelName:'Animal',
    tableName:'animais',
    timestamps:false,
  }
);

