const PeopleService = require("../service/PeopleService");

class PeopleEndpoint {

    constructor() {
        this._service = new PeopleService();
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
    }

    async findAll(request, response, next) {
        try {
            const peoples = await this._service.findAll();
            return response.json(peoples);
        } catch(error) {
            next(error);
        }
    }

    async findById(request, response, next) {
        try {
            const id = request.params.id;
            const people = await this._service.findById(id);
            return response.json(people);
        } catch(error) {
            next(error);
        }
    }

    async create(request, response, next) {
        try {
            const newFarm = request.body;
            await this._service.create(newFarm);
            return response.sendStatus(201);
        } catch(error) {
            next(error);
        }
    }

    async remove(request, response, next) {
        try {
            const id = request.params.id;
            await this._service.remove(id);
            return response.sendStatus(204);
        } catch(error) {
            next(error);
        }
    }

    async update(request, response, next) {
        try {
            const id = request.params.id;
            const datasModified = request.body;
            await this._service.update(id, datasModified);
            return response.sendStatus(204);
        } catch(error) {
            next(error);
        }
    }
}

module.exports = PeopleEndpoint;