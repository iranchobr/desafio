const {Model, DataTypes} = require('sequelize');

class Pessoas extends Model {
    static init(connection){
        super.init({
            no_pessoa : DataTypes.STRING,
            no_email : DataTypes.STRING,
            endereco : DataTypes.STRING,
            sexo : DataTypes.CHAR,
            ic_ativo : DataTypes.BOOLEAN
        }, {
            sequelize: connection,
            modelName: 'Pessoas',
            tableName: 'pessoa'
        })
    }

    // Definindo relacionamento
    
    static associate(models) {
        // Pessoa (1:N) Animais
        this.hasMany(models.Animais, {
            foreignKey: 'fk_id_pessoa', 
            as: 'animaisPessoa'
        });
    }
}
module.exports = Pessoas;