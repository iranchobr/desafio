const {Model, DataTypes} = require('sequelize');
const AnimaisLote = require('./AnimaisLote');

class Animais extends Model {
    static init(connection){
        super.init({
            fk_id_pessoa: DataTypes.INTEGER,
            id_fazenda : DataTypes.INTEGER,
            no_animal : DataTypes.STRING,
            no_raca : DataTypes.STRING,
            sexo : DataTypes.CHAR,
            vr_peso : DataTypes.FLOAT,
            dt_nascimento : DataTypes.DATEONLY
            
        }, {
            sequelize: connection,
            modelName: 'Animais',
            tableName: 'animais'

        })
    }
    static associate(models) {
        this.belongsTo(models.Pessoas, {
        /* 1 animal de 1 unico dono */
            foreignKey: 'fk_id_pessoa', as: 'dono', /* Coluna dentro de Animal que representa
            a relação com pessoas + nome do relacionamento */
          });
          this.belongsToMany(models.Lotes, {
            through: 'animal_lote',
            as: 'lotes',
            foreignKey: 'fk_id_lote',
          });
    }


}
module.exports = Animais;