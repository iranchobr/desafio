const {Model, DataTypes} = require('sequelize');
class Pessoas extends Model {
  static init (sequelize){
    super.init(
      {
       nome: DataTypes.STRING,
       email: DataTypes.STRING,
       endereco: DataTypes.STRING,
       sexo: DataTypes.STRING,
       ativo: DataTypes.BOOLEAN,
      },
      {sequelize,}
    );
  };
};
module.exports = Pessoas;
