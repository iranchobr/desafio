const Animal = require("../models/Animais");
const Lotes = require("../models/Lotes");

const AnimaisLotes = require('../models/AnimaisLote');


module.exports = {
    async store(req, res){
        /* Grava um elemento da tabela de junção */

        const {id_animal, id_lote} = req.params;
      
        const {
            dt_nascimento,
			dt_entrada,
			dt_saida,
			dt_ultima_mov ,
			ic_bezerro
        } = req.body;
        
        const lote_animal = {
            fk_id_lote: id_lote,
            fk_id_animal: id_animal,
            dt_nascimento,
			dt_entrada,
			dt_saida,
			dt_ultima_mov ,
			ic_bezerro
        }
    
        AnimaisLotes.create(lote_animal)
            .then(lote_animal => res.json(lote_animal))
            .catch(e => res.send(e));

    },

    async index(req, res) {
        /* Lista todos os elementos da tabela de junção */
        try {
            const animal_lote = await AnimaisLotes.findAll()
            res.json(animal_lote);
        } catch(e){
            res.send(e);
        }
    },
    async show(req, res){
        /* Mostra um unico elemento da tabela de junção */
        const {id_relacao} = req.params;
        try{
            const animal_lote = await AnimaisLotes.findByPk(id_relacao);
            res.json(animal_lote);
        }catch(e){
            res.send(e);
        }
    },
    async update(req, res){
          /* Recebe id_relacao via query_params e atualiza 
          um elemento da tabela */
          const {id_relacao} = req.params;
          
          const relacao = await AnimaisLotes.findByPk(id_relacao);
          
          if(!relacao){
              return res.status(400).json({ error: 'Relacao não encontrada' });
          }
  
          /*Atualizando Animal */
  
          relacao.update(req.body)
              .then(relacao => res.json(relacao))
              .catch(err => {error : err})
  
    },
    async delete(req, res){
        /* Recebe id_relacao via query params e apaga a relacao correspondente 
        na tabela de junção */
        try {
            const animal_lote = await AnimaisLotes.findByPk(req.params.id_relacao)
            
            if(!animal_lote){
                return res.send('Relação não encontrada')
            }

            animal_lote.destroy()
            .then(relacao => res.json(relacao));

        } catch(e){
            res.send(e);
        }
    }
}