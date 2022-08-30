const Pessoa = require("../models/Pessoas");
const Animal = require("../models/Animais");

const connection = require("../../database/connection");

Pessoa.init(connection);

module.exports = {
    create(req, res) {
        const {
            no_pessoa,
            no_email,
            endereco,
            sexo,
            ic_ativo
        } = req.body;

        const pessoa = {
            no_pessoa,
            no_email,
            endereco,
            sexo,
            ic_ativo
        };

        Pessoa.create(pessoa)
            .then(pessoa => {res.json(pessoa)})
            .catch(e => res.send(e));
    },

    index(req, res) {
        Pessoa.findAll()
            .then(pessoas => pessoas && pessoas.length ? res.json(pessoas) : res.json({Erro: 'Não foram encontrados usuários'}))
            .catch(e => res.send(e));
    },

    show(req, res) {
        const {id_user} = req.params;
        Pessoa.findByPk(id_user)
            .then(pessoa => pessoa ? res.json(pessoa) : res.json({Erro: 'Usuário não encontrado'}))
            .catch(e => res.send(e));
    },

    showAnimals(req, res) {
        const {id_user} = req.params;
        Animal.findAll({ where: {fk_id_pessoa: id_user} })
            .then(animais => animais && animais.length ? res.json(animais) : res.json({Erro: 'Esta pessoa não tem animais'}))
            .catch(e => res.send(e));
    },

    async update(req, res) {
        const {id_user} = req.params;
        const pessoa = await Pessoa.findByPk(id_user)
        if(!pessoa){
            res.json({Erro: 'Usuário não encontrado'})
        }
        pessoa.update(req.body)
            .then(pessoa => pessoa ? res.json(pessoa) : res.json({Erro: 'Usuário não atualizado'}))
            .catch(e => res.send(e));
    },

    async delete(req, res) {
        const {id_user} = req.params;
        await Pessoa.findByPk(id_user)
            .then(pessoa => pessoa.destroy())
            .then(pessoa => res.json({pessoa, Status: 'Pessoa removida com sucesso!'}))
            .catch(e => res.json({e, Erro: 'Usuário não encontrado'}));
    }
}
