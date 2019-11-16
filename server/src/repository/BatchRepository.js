const Repository = require("./Repository");
const db = require("./../models/index");
const { Op } = require("sequelize");

class BatchRepository extends Repository {

    constructor() {
        super(db.Batchs);
    }

    findAll() {
        return this.getModel().findAll({
            include: [{
                model: db.Animals,
                attributes: ["id", "name", "species", "sex", "weight"],
                through: { attributes: ["date_output", "date_input", "ic_animal", "date_last_movimentation"] }
            }]
        });
    }

    async findById(id) {
        const register = await this.getModel().findAll({
            include: [{
                model: db.Animals,
                attributes: ["id", "name", "species", "sex", "weight"],
                through: { attributes: ["date_output", "date_input", "ic_animal", "date_last_movimentation"] }
            }],
            where: { id: id }
        });

        return register[0] || null;

    }

    async findByName(name) {
        const register = await this.getModel().findAll({
            where: {
                "name": name
            }
        });

        return register[0] || null;
    }


    async findByNameAndIdDifferenceMencionated(name, id) {
        const register = await this.getModel().findAll({
            where: {
                "name": name,
                id: {
                    [Op.notIn]: [id]
                }
            }
        });

        return register[0] || null;
    }

    
}

module.exports = BatchRepository;