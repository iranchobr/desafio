"use strict";

const { Model, DataTypes } = require("sequelize");
const Sequelize = require("sequelize");

class Lote extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        no_lote: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        ds_lote: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "lote",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Animal, {
      through: "animal_x_lote",
      foreignKey: "fk_id_animal",
    });
  }
}

module.exports = Lote;
