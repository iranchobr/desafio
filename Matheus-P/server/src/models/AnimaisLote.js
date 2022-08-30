const {Model, DataTypes} = require('sequelize');

class AnimaisLote extends Model {
    static init(connection){
        super.init({
            fk_id_lote: DataTypes.INTEGER,
            fk_id_animal: DataTypes.INTEGER,
			dt_entrada: DataTypes.DATEONLY,
			dt_saida: DataTypes.DATEONLY,
			dt_ultima_movimentacao : DataTypes.DATEONLY,
			ic_bezerro: DataTypes.BOOLEAN
        }, {
            sequelize: connection,
            modelName: 'AnimaisLote',
            tableName: 'animal_x_lote'
        })
    }

}
module.exports = AnimaisLote;