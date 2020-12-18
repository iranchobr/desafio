const Sequelize = require("sequelize");
const db = require("../config/db.config");
const animal = require("../models/animal");
const lote = require("../models/lote");

const animalLote = db.define(
    "animal_x_lote", {
        id: {
            type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true,
        },
        id_animal: {
            type: Sequelize.INTEGER,
        },
        id_lote: {
            type: Sequelize.INTEGER,
        },
        dt_entrada: {
            type: Sequelize.DATE,
        },
        dt_saida: {
            type: Sequelize.DATE,
        },
        dt_ultima_movimentacao: {
            type: Sequelize.DATE,
        },
        ic_bezerro: {
            type: Sequelize.BOOLEAN,
        },
    },

    {
        timestamps: false,
        tableName: "animal_x_lote"
    }
);

animalLote.belongsTo(animal, {foreignKey: "id_animal"});
animalLote.belongsTo(lote, {foreignKey: "id_lote"});

module.exports = animalLote;
