const Animal = require("../models/Animais");

module.exports = {
    async create(req, res){
        const {id_user} = req.params;
        const {
            id_fazenda, 
            no_animal, 
            no_raca, 
            sexo, 
            vr_peso, 
            dt_nascimento
        } = req.body;

        const animal = {
            id_fazenda,
            fk_id_pessoa: id_user,
            no_animal, 
            no_raca, 
            sexo, 
            vr_peso, 
            dt_nascimento
        }
        
        Animal.create(animal)
            .then(animal => res.json(animal))
            .catch(e => res.send(e));
    },

    index(req, res) {
        Animal.findAll()
            .then(animais => animais && animais.length ? res.json(animais) : res.json({Erro: 'Não foram encontrados usuários'}))
            .catch(e => res.send(e));
    },

    show(req, res) {
        const {id_animal} = req.params;
        Animal.findByPk(id_animal)
            .then(animal => animal ? res.json(animal) : res.json({Erro: 'Animal não encontrado'}))
            .catch(e => res.send(e));
    },

    async update(req, res){
        const {id_animal} = req.params;
        const animal = await Animal.findByPk(id_animal);
        if(!animal){
            res.json({ Erro: 'Animal não encontrado' });
        }
        animal.update(req.body)
            .then(animal => animal ? res.json(animal) : res.json({Erro: 'Animal não atualizado'}))
            .catch(e => res.send(e));

    },

    async delete(req, res) {
        const {id_animal} = req.params;
        await Animal.findByPk(id_animal)
            .then(animal => animal.destroy())
            .then(animal => res.json({animal, Status: 'Animal removido com sucesso!'}))
            .catch(e => res.json({e, Erro: 'Animal não encontrado'}));
    }
}