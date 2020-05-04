const BatchService = require("../service/BatchService");
const BatchAnimalService = require("../service/BatchAnimalService");

class BatchEndpoint {

    constructor() {
        this._service = new BatchService();
        this._batchAnimalService = new BatchAnimalService();
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
    }

    async findAll(request, response, next) {
        try {
            const batchs = await this._service.findAll();
            return response.json(batchs);
        } catch(error) {
            next(error);
        }
    }

    async findById(request, response, next) {
        try {
            const id = request.params.id;
            const batch = await this._service.findById(id);
            return response.json(batch);
        } catch(error) {
            next(error);
        }
    }

    async create(request, response, next) {
        try {
            const { name, description, batch_animal } = request.body;
            const batchCreated = await this._service.create({ name, description });
            await this._batchAnimalService.create(batch_animal, batchCreated.id);
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

module.exports = BatchEndpoint;