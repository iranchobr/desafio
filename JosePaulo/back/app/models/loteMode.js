const {Model, DataTypes} = require('sequelize');
class lotes  extends Model{
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
module.exports = lotes;