const {Model, DataTypes} = require('sequelize');

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
            tableName: 'animal'

        })
    }

    // Definindo relacionamentos
    
    static associate(models) {
        this.belongsTo(models.Pessoas, {
            // Animal (1:1) Pessoa
            foreignKey: 'fk_id_pessoa', as: 'dono', /* Coluna dentro de Animal que representa
            a relação com pessoas + nome do relacionamento */
          });
          
        this.belongsToMany(models.Lotes, {
            // Animais (M:N) Lotes
            through: 'animal_x_lote',
            foreignKey: 'fk_id_lote',
          });
    }


}
module.exports = Animais;