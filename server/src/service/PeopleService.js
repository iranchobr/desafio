const PeopleRepository = require("../repository/PeopleRepository");
const LogicNegociationException = require("../exceptions/LogicNegociationException");
const NotFoundException = require("../exceptions/NotFoundException");
const MessageException = require("../exceptions/MessageException");

class PeopleService {

    constructor() {
        this._repository = new PeopleRepository();
    }

    findAll(fieldsReturn) {
        return this._repository.findAll(fieldsReturn);
    }

    async findById(id) {
        const people = await this._repository.findById(id);
        if (!people) {
            throw new NotFoundException(MessageException.NOT_FOUND, "people", 404);
        }

        return people;
    }

    async create(newDatas) {
        const email = newDatas.email || "";
        const register = await this._repository.findByEmail(email);
        if (register) {
            throw new LogicNegociationException(MessageException.EMAIL_PEOPLE_EXIST, null, 409);
        }
        return this._repository.create(newDatas);
    }

    async remove(id) {
        const register = await this._repository.findById(id);
        if (!register) {
            throw new NotFoundException(MessageException.NOT_FOUND, "people", 404);
        }
        return this._repository.remove(id);
    }

    async update(id, datasModified) {
        const register = await this._repository.findById(id);
        if (!register) {
            throw new NotFoundException(MessageException.NOT_FOUND, "people", 404);
        }

        const email = datasModified.email || "";
        const registerWithEmilIdDifference = await this._repository
            .findByEmailAndIdDifferenceMencionated(email, id)
            
        if (registerWithEmilIdDifference) {
            throw new LogicNegociationException(MessageException.EMAIL_PEOPLE_EXIST, null, 409);
        }

        return this._repository.update(id, datasModified);
    }

}


module.exports = PeopleService;