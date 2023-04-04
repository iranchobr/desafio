const { Sequelize, Model, DataTypes } = require("sequelize");

class Pessoa extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        no_pessoa: DataTypes.STRING,
        no_email: DataTypes.STRING,
        endereco: DataTypes.STRING,
        sexo: DataTypes.STRING,
        ic_ativo: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: "Pessoa",
        tableName: "pessoa",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Animal, {
      foreignKey: "fk_id_pessoa",
      as: "animais",
    });
  }
}

module.exports = Pessoa;
