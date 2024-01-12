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
            tableName: 'pessoas'
        })
    }
    static associate(models) {
        /*
            1 pessoa tem vários animais (1:N)
        */
        this.hasMany(models.Animais, {
            foreignKey: 'fk_id_pessoa', /* Chave Estrangeira que está na tabela animais*/ 
            as: 'animaisPessoa' /*Nome do Relacionamento*/
        });
    }
}
module.exports = Pessoas;