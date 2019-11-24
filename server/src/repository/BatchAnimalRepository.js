const Repository = require("./Repository");
const db = require("./../models/index");

class BatchAnimalRepository extends Repository {

    constructor() {
        super(db.BatchsAnimals);
    }

    findByAnimalId(animalId) {
        return this.getModel().findAll({ where: {
            animal_id: animalId
        }});
    }
}

module.exports = BatchAnimalRepository;