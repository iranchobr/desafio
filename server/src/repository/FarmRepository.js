const Repository = require("./Repository");
const db = require("./../models/index");
const { Op } = require("sequelize");

class FarmRepository extends Repository {

    constructor() {
        super(db.Farms);
    }

    findAnimalByFarmId(farmId) {
        return db.Animals.findOne({ where: { farm_id: farmId }});
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
                "name": name, id: { [Op.notIn]: [id] }
            }
        });

        return register[0] || null;
    }
}

module.exports = FarmRepository;