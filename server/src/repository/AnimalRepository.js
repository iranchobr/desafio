const Repository = require("./Repository");
const db = require("./../models/index");

class AnimalRepository extends Repository {

    constructor() {
        super(db.Animals);
    }

}

module.exports = AnimalRepository;