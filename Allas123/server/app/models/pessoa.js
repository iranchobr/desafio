const Sequelize = require("sequelize");
const db = require("../config/db.config");

const pessoa = db.define(
    "pessoa",
    {
        id : {
            type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true,
        },
        no_pessoa: {
            type: Sequelize.STRING,
        },
        no_email: {
            type: Sequelize.STRING,
        },
        endereco: {
            type: Sequelize.STRING,
        },
        sexo: {
            type: Sequelize.CHAR,
        },
        ic_ativo: {
            type: Sequelize.BOOLEAN,
        },
    },
    {
        timestamps: false,
        tableName: "pessoa"
    }
);

module.exports = pessoa;