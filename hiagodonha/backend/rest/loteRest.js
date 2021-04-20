const database = require('../app/models');

class LotesRest {
    static async getLotes(req, res) {
        try {
            const lotes = await database.lote.findAll();
            return res.status(200).json(lotes);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async getLote(req, res) {
        try {
            const lote = await database.lote.findOne(
                { where: { id: Number(req.params.id) } }
            );
            return res.status(200).json(lote);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async setLote(req, res) {
        try {
            const lote = await database.lote.create(req.body);
            return res.status(200).json({
                person: lote,
                message: 'Lot successfully inserted.'
            });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async updateLote(req, res) {
        try {
            await database.lote.update(
                req.body, 
                { where: { id: req.params.id } }
            );

            const lote = await database.lote.findOne(
                { where: { id: req.params.id } }
            );
            return res.status(200).json({
                person: lote,
                message: 'Lot successfully updated.'
            });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async deleteLote(req, res) {
        try {
            const lote = await database.lote.findOne(
                { where: { id: req.params.id } }
            );
            await database.lote.destroy(
                { where: { id: req.params.id } }
            );
            return res.status(200).json({
                person: lote,
                message: 'Lot successfully deleted.'
            });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
}

module.exports = LotesRest;