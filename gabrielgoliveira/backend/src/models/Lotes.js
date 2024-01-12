const {Model, DataTypes} = require('sequelize');
const AnimaisLote = require('./AnimaisLote');

class Lotes extends Model {
    static init(connection){
        super.init({
            no_lote: DataTypes.STRING,
            ds_lote : DataTypes.STRING
            
        }, {
            sequelize: connection,
            modelName: 'Lotes',
            tableName: 'lotes'
        })
    }
    static associate(models) {        
        this.belongsToMany(models.Animais, {
            through: 'animal_lote',
            foreignKey: 'fk_id_animal'
          });
    }
}
module.exports = Lotes;