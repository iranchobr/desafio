const Sequelize = require("sequelize");
const db = require("../config/db.config");

const lote = db.define(
    "animal_lote",
    {
        id:{
            type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
        },
        no_lote: {
            type: Sequelize.STRING,
        },
        ds_lote: {
            type: Sequelize.STRING
        },
    },{
        timestamps: false,
        tableName: "animal_lote"
    }
);

module.exports = lote;