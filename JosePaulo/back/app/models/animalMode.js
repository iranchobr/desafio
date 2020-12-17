const { Model, DataTypes } = require("sequelize");
class Animais extends Model {
  static init(sequelize) {
    super.init(
      {
        fk_id_pessoas: DataTypes.INTEGER,
        id_fazenda: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        raca: DataTypes.STRING,
        sexo: DataTypes.CHAR,
        peso: DataTypes.FLOAT,
        nascimento: DataTypes.DATEONLY,
      },
      { sequelize },
      (Animais.associate = (models) => {
        Animais.belongsTo(models.PessoaModel, {
          as: "proprietario", 
          foreignKey: "fk_id_pessoas", 
          onUpdate: "CASCADE", 
          onDelete: "CASCADE", 
        });
      })
    );
  };
}
module.exports = Animais;