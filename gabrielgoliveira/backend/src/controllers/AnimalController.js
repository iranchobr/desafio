const { response } = require("express");
const Animal = require("../models/Animais");
const Lotes = require("../models/Lotes");
const Pessoa = require("../models/Pessoas");

module.exports = {
    async teste(req, res){
    },  
    async store(req, res){

        const {id_user, id_lote} = req.params;
        const user = await Pessoa.findByPk(id_user);
        const lote = await Lotes.findByPk(id_lote);

        /* Gravando animal caso o usuário seja valido */

        const {
            id_fazenda, 
            no_animal, 
            no_raca, 
            sexo, 
            vr_peso, 
            dt_nascimento,
            ic_bezerro,
      
        } = req.body;

        const animal = {
            id_fazenda,
            fk_id_pessoa: id_user,
            no_animal, 
            no_raca, 
            sexo, 
            vr_peso, 
            dt_nascimento,
            ic_bezerro
        }
        console.log(animal);
        Animal.create(animal)
            .then(animal => res.json(animal))
            .catch(e => res.send(e));
                
    },

    async show(req, res) {
        /* Busca um animal referente ao seu ID */
      const {id_animal} = req.params;

      Animal.findByPk(id_animal)
        .then(animal => res.json(animal))
        .catch(err => res.send(err));
    },
    async index(req, res) {
        /* Validando id de pessoa */ 
         Animal.findAll({
            include: [{
                model: Pessoa,
                as: 'dono',
                required: true
               }]
         })
         .then( animais => {
             return res.json(animais);
         })
         .catch(err => console.log(err));
    },
    async update(req, res){
        /* Validando animal */
        const {id_animal} = req.params;

        const animal = await Animal.findByPk(id_animal);
        console.log(animal)
        if(!animal){
            return res.status(400).json({ error: 'Animal não econtrado' });
        }

        /*Atualizando Animal */

        animal.update(req.body)
            .then(animal => res.json(animal))
            .catch(err => {error : err})

    },
    async delete(req, res){
         /* Validando animal */
         const {id_animal} = req.params;

         const animal = await Animal.findByPk(id_animal);

         if(!animal){
             return res.status(400).json({ error: 'Animal não encontrado' });
         }
        /* Apagando animal */
        animal.destroy()
        .then(animal => {
            return res.json({
                animal : animal,
                status: 'removido'
            })
        }).catch(err => {
            res.json({
                error: err,
                desc : 'ocorreu um erro na remoção'
            });
        })
      
    }
}