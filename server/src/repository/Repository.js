class Repository {

    constructor(model) {
        this._model = model;
    }

    getModel() {
        return this._model;
    }

    findAll() {
        return this._model.findAll({});
    }

    async findById(id) {
        const register = await this._model.findAll({ where: { id } });
        return register[0] || null;
    }

    create(newData) {
        return this._model.create(newData);
    }

    update(id, datasModified) {
        return this._model.update(datasModified, { where: { id } });
    }

    remove(id) {
        return this._model.destroy({ where: { id }});
    }
}

module.exports = Repository;