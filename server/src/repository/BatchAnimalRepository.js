const Repository = require("./Repository");
const db = require("./../models/index");

class BatchAnimalRepository extends Repository {

    constructor() {
        super(db.BatchsAnimals);
    }
}

module.exports = BatchAnimalRepository;