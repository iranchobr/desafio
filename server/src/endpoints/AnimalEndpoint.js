const AnimalService = require("../service/AnimalService");

class AnimalEndpoint {

    constructor() {
        this._service = new AnimalService();
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
    }

    async findAll(request, response, next) {
        try {
            const animals = await this._service.findAll();
            return response.json(animals);
        } catch(error) {
            next(error);
        }
    }

    async findById(request, response, next) {
        try {
            const id = request.params.id;
            const animal = await this._service.findById(id);
            return response.json(animal);
        } catch(error) {
            next(error);
        }
    }

    async create(request, response, next) {
        try {
            const newAnimal = request.body;
            await this._service.create(newAnimal);
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

module.exports = AnimalEndpoint;