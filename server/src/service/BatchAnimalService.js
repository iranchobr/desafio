const BatchAnimalRepository = require("../repository/BatchAnimalRepository");
const LogicNegociationException = require("../exceptions/LogicNegociationException");
const NotFoundException = require("../exceptions/NotFoundException");
const MessageException = require("../exceptions/MessageException");
const AnimalService = require("./AnimalService");

class BatchAnimalService {

    constructor() {
        this._repository = new BatchAnimalRepository();
        this._animalService = new AnimalService();
    }

    async create(newDatas, idBatchInserted) {
        const promises = newDatas.map(newRegister => {
            return new Promise(async (resolve, reject) => {
                try {
                    await this._animalService.findById(newRegister.animal_id);
                    await this._repository.create({ ...newRegister, batch_id: idBatchInserted });
                    resolve();
                } catch (error) {
                    reject(error);
                }
            })
        });
        return Promise.all(promises);
    }

}


module.exports = BatchAnimalService;