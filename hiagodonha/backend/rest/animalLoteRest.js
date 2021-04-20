const database = require('../app/models');

class AnimaisLotesRest {
    static async getAnimaisLotes(req, res) {
        try {
            const animal_x_lotes = await database.animal_x_lote.findAll();
            return res.status(200).json(animal_x_lotes);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async getAnimalLoteById(req, res) {
        try {
            const animal_x_lote = await database.animal_x_lote.findOne(
                { where: { id: Number(req.params.id) } }
            );
            return res.status(200).json(animal_x_lote);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async setAnimalLote(req, res) {
        try {
            const animal_x_lote = await database.animal_x_lote.create(req.body);
            return res.status(200).json({
                person: animal_x_lote,
                message: 'AnimalLote successfully inserted.'
            });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async updateAnimalLote(req, res) {
        try {
            await database.animal_x_lote.update(
                req.body, 
                { where: { id: req.params.id } }
            );

            const animal_x_lote = await database.animal_x_lote.findOne(
                { where: { id: req.params.id } }
            );
            return res.status(200).json({
                person: animal_x_lote,
                message: 'AnimalLote successfully updated.'
            });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async deleteAnimalLote(req, res) {
        try {
            const animal_x_lote = await database.animal_x_lote.findOne(
                { where: { id: req.params.id } }
            );
            await database.animal_x_lote.destroy(
                { where: { id: req.params.id } }
            );
            return res.status(200).json({
                person: animal_x_lote,
                message: 'AnimalLote successfully deleted.'
            });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
}

module.exports = AnimaisLotesRest;