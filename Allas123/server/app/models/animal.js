const Sequelize = require("sequelize");
const db = require("../config/db.config");
const pessoa = require("../models/pessoa");

const animal = db.define(
    "animal",
    {
        id : {
            type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
        },
        id_pessoa: {
            type: Sequelize.INTEGER,
        },
        id_fazenda: {
            type: Sequelize.INTEGER,
        },
        no_animal: {
            type: Sequelize.STRING,
        },
        no_raca: {
            type: Sequelize.STRING,
        },
        sexo: {
            type: Sequelize.CHAR,
        },
        vr_peso: {
            type: Sequelize.FLOAT,
        },
        dt_nascimento: {
            type: Sequelize.DATE,
        },
    },
    {
        timestamps: false,
        tableName: "animal"
    }
);

animal.belongsTo(pessoa,{foreignKey: "id_pessoa"});

module.exports = animal;