const { Sequelize, Model, DataTypes } = require("sequelize");

class Animal extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        fk_id_pessoa: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Pessoa",
            key: "id",
          },
        },
        id_fazenda: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        no_animal: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        no_raca: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sexo: {
          type: DataTypes.CHAR,
          allowNull: false,
        },
        vr_peso: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        dt_nascimento: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Animal",
        tableName: "animal",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Pessoa, {
      foreignKey: "fk_id_pessoa",
      as: "dono",
    });
  }
}

module.exports = Animal;
