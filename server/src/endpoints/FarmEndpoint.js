const FarmService = require("../service/FarmService");

class FarmEndpoint {

    constructor() {
        this._service = new FarmService();
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
    }

    async findAll(request, response, next) {
        try {
            const farms = await this._service.findAll();
            return response.json(farms);
        } catch(error) {
            next(error);
        }
    }

    async findById(request, response, next) {
        try {
            const id = request.params.id;
            const farm = await this._service.findById(id);
            return response.json(farm);
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

module.exports = FarmEndpoint;