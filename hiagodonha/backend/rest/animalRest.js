const database = require('../app/models');

class AnimaisRest {
    static async getAnimais(req, res) {
        try {
            const animais = await database.animal.findAll();
            return res.status(200).json(animais);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async getAnimalById(req, res) {
        try {
            const animal = await database.animal.findOne(
                { where: { id: Number(req.params.id) } }
            );
            return res.status(200).json(animal);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async setAnimal(req, res) {
        try {
            const animal = await database.animal.create(req.body);
            return res.status(200).json({
                person: animal,
                message: 'Animal successfully inserted.'
            });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async updateAnimal(req, res) {
        try {
            await database.animal.update(
                req.body, 
                { where: { id: req.params.id } }
            );

            const animal = await database.animal.findOne(
                { where: { id: req.params.id } }
            );
            return res.status(200).json({
                person: animal,
                message: 'Animal successfully updated.'
            });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async deleteAnimal(req, res) {
        try {
            const animal = await database.animal.findOne(
                { where: { id: req.params.id } }
            );
            await database.animal.destroy(
                { where: { id: req.params.id } }
            );
            return res.status(200).json({
                person: animal,
                message: 'Animal successfully deleted.'
            });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
}

module.exports = AnimaisRest;