const BatchRepository = require("../repository/BatchRepository");
const LogicNegociationException = require("../exceptions/LogicNegociationException");
const NotFoundException = require("../exceptions/NotFoundException");
const MessageException = require("../exceptions/MessageException");

class BatchService {

    constructor() {
        this._repository = new BatchRepository();
    }

    findAll() {
        return this._repository.findAll();
    }

    async findById(id) {
        const batch = await this._repository.findById(id);
        if (!batch) {
            throw new NotFoundException(MessageException.NOT_FOUND, "batch", 404);
        }

        return batch;
    }

    async create(newDatas) {
        const batch = await this._repository.findByName(newDatas.name);
        if (batch) {
            throw new LogicNegociationException(MessageException.NAME_BATCH_EXIST, null, 409);
        }
        return this._repository.create(newDatas);
    }

    async remove(id) {
        const register = await this._repository.findById(id);
        if (!register) {
            throw new NotFoundException(MessageException.NOT_FOUND, "batch", 404);
        }
        return this._repository.remove(id);
    }

    async update(id, datasModified) {
        const register = await this._repository.findById(id);
        if (!register) {
            throw new NotFoundException(MessageException.NOT_FOUND, "batch", 404);
        }

        const name = datasModified.name || "";
        const batch = await this._repository.findByNameAndIdDifferenceMencionated(name, id);
        if (batch) {
            throw new LogicNegociationException(MessageException.NAME_BATCH_EXIST, null, 409);
        }

        return this._repository.update(id, datasModified);
    }

}


module.exports = BatchService;