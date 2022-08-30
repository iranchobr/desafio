const {Model, DataTypes} = require('sequelize');

class Lotes extends Model {
    static init(connection){
        super.init({
            no_lote: DataTypes.STRING,
            ds_lote : DataTypes.STRING
            
        }, {
            sequelize: connection,
            modelName: 'Lotes',
            tableName: 'animal_lote'
        })
    }

    // Definindo relacionamento
    
    static associate(models) {
        // Animais (M:N) Lotes
        this.belongsToMany(models.Animais, {
            through: 'animal_x_lote',
            foreignKey: 'fk_id_animal'
          });
    }
}
module.exports = Lotes;