const database = require('../app/models');

class PessoasRest {
    static async getPessoas(req, res) {
        try {
            const pessoas = await database.pessoa.findAll();
            return res.status(200).json(pessoas);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async getPessoaById(req, res) {
        try {
            const pessoa = await database.pessoa.findOne(
                { where: { id: Number(req.params.id) } }
            );
            return res.status(200).json(pessoa);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async setPessoa(req, res) {
        try {
            const pessoa = await database.pessoa.create(req.body);
            return res.status(200).json({
                person: pessoa,
                message: 'Person successfully inserted.'
            });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async updatePessoa(req, res) {
        try {
            await database.pessoa.update(
                req.body, 
                { where: { id: req.params.id } }
            );

            const pessoa = await database.pessoa.findOne(
                { where: { id: req.params.id } }
            );
            return res.status(200).json({
                person: pessoa,
                message: 'Person successfully updated.'
            });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async deletePessoa(req, res) {
        try {
            const pessoa = await database.pessoa.findOne(
                { where: { id: req.params.id } }
            );
            await database.pessoa.destroy(
                { where: { id: req.params.id } }
            );
            return res.status(200).json({
                person: pessoa,
                message: 'Person successfully deleted.'
            });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
}

module.exports = PessoasRest;