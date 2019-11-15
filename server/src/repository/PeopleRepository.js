const Repository = require("./Repository");
const db = require("./../models/index");
const { Op } =  require("sequelize");

class PeopleRepository extends Repository {

    constructor() {
        super(db.Peoples);
    }

    async findByEmail(email) {
        const register = await this.getModel().findAll({
            where: {
                email: email
            }
        });

        return register[0] || null;
    }

    async findByEmailAndIdDifferenceMencionated(email, id) {
        const register = await this.getModel().findAll({
            where: {
                email: email,
                id : {
                    [Op.notIn]: [id]
                }
            }
        });

        return register[0] || null;
    }

}

module.exports = PeopleRepository;