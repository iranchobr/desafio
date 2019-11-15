const FarmRepository = require("../repository/FarmRepository");
const LogicNegociationException = require("../exceptions/LogicNegociationException");
const NotFoundException = require("../exceptions/NotFoundException");
const MessageException = require("../exceptions/MessageException");

class FarmService {

    constructor() {
        this._repository = new FarmRepository();
    }

    findAll() {
        return this._repository.findAll();
    }

    async findById(id) {
        const farm = await this._repository.findById(id);
        if (!farm) {
            throw new NotFoundException(MessageException.NOT_FOUND, "farm", 404);
        }

        return farm;
    }

    async create(newDatas) {
        const farm = await this._repository.findByName(newDatas.name);
        if (farm) {
            throw new LogicNegociationException(MessageException.NAME_FARM_EXIST, null, 409);
        }
        return this._repository.create(newDatas);
    }

    async remove(id) {
        const register = await this._repository.findById(id);
        if (!register) {
            throw new NotFoundException(MessageException.NOT_FOUND, "farm", 404);
        }
        return this._repository.remove(id);
    }

    async update(id, datasModified) {
        const register = await this._repository.findById(id);
        if (!register) {
            throw new NotFoundException(MessageException.NOT_FOUND, "farm", 404);
        }

        const registerWithNameIdDifference = await this._repository
            .findByNameAndIdDifferenceMencionated(datasModified.name, id);
        if (registerWithNameIdDifference) {
            throw new LogicNegociationException(MessageException.NAME_FARM_EXIST, null, 409);
        }

        return this._repository.update(id, datasModified);
    }

}


module.exports = FarmService;