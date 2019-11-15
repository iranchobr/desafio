const AnimalRepository = require("../repository/AnimalRepository");
const LogicNegociationException = require("../exceptions/LogicNegociationException");
const NotFoundException = require("../exceptions/NotFoundException");
const MessageException = require("../exceptions/MessageException");
const PeopleService = require("../service/PeopleService");
const FarmService = require("../service/FarmService");

class AnimalService {

    constructor() {
        this._peopleService = new PeopleService();
        this._farmService = new FarmService();
        this._repository = new AnimalRepository();
    }

    findAll() {
        return this._repository.findAll();
    }

    async findById(id) {
        const animal = await this._repository.findById(id);
        if (!animal) {
            throw new NotFoundException(MessageException.NOT_FOUND, "animal", 404);
        }

        return animal;
    }

    async create(newDatas) {
        await this._peopleService.findById(newDatas.people_id);
        await this._farmService.findById(newDatas.farm_id);
        return this._repository.create(newDatas);
    }

    async remove(id) {
        const register = await this._repository.findById(id);
        if (!register) {
            throw new NotFoundException(MessageException.NOT_FOUND, "animal", 404);
        }
        return this._repository.remove(id);
    }

    async update(id, datasModified) {
        const register = await this._repository.findById(id);
        if (!register) {
            throw new NotFoundException(MessageException.NOT_FOUND, "animal", 404);
        }

        const isInformatedOtherPeopleId = datasModified.people_id || null;
        if (isInformatedOtherPeopleId) await this._peopleService.findById(datasModified.people_id);

        const isInformatedOtherFarmId = datasModified.farm_id || null;
        if (isInformatedOtherFarmId) await this._farmService.findById(datasModified.farm_id);

        return this._repository.update(id, datasModified);
    }

}


module.exports = AnimalService;