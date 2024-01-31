const { Model, DataTypes } = require("sequelize");

class AnimalLote extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        fk_id_animal: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        fk_id_lote: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        dt_entrada: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        dt_saida: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        dt_ultima_movimentacao: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        ic_bezerro: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "AnimalLote",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Animal, { foreignKey: "fk_id_animal", as: "animal" });
    this.belongsTo(models.Lote, { foreignKey: "fk_id_lote", as: "lote" });
  }
}

module.exports = AnimalLote;
