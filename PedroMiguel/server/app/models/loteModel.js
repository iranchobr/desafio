const {Model, DataTypes} = require('sequelize');
class Lote  extends Model{
 static init (sequelize){
   super.init(
     {
       nome: DataTypes.STRING,
       descricao: DataTypes.STRING,
     },
     {sequelize}
   );
 }; 
};
module.exports = Lote;