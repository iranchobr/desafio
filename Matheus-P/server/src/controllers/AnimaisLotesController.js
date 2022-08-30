const AnimaisLotes = require('../models/AnimaisLote');

module.exports = {
    create(req, res){
        const {id_animal, id_lote} = req.params;      
        const {
            dt_nascimento,
			dt_entrada,
			dt_saida,
			dt_ultima_movimentacao,
			ic_bezerro
        } = req.body;
        
        const lote_animal = {
            fk_id_lote: id_lote,
            fk_id_animal: id_animal,
            dt_nascimento,
			dt_entrada,
			dt_saida,
			dt_ultima_movimentacao,
			ic_bezerro
        }
    
        AnimaisLotes.create(lote_animal)
            .then(relacao => res.json(relacao))
            .catch(e => res.send(e));
    },

    index(req, res) {
        AnimaisLotes.findAll()
            .then(relacao => relacao && relacao.length ? res.json(relacao) : res.json({Erro: 'Não foram encontradas relações'}))
            .catch(e => res.send(e));
    },

    show(req, res){
        const {id_relacao} = req.params;
        AnimaisLotes.findByPk(id_relacao)
            .then(relacao => relacao ? res.json(relacao) : res.json({Erro: 'Relação não encontrada'}))
            .catch(e => res.send(e));
    },

    async update(req, res){
        const {id_relacao} = req.params;          
        const relacao = await AnimaisLotes.findByPk(id_relacao);          
        if(!relacao){
            res.json({Erro: 'Relação não encontrada'})
        }
        relacao.update(req.body)
            .then(relacao => relacao ? res.json(relacao) : res.json({Erro: 'Relação não atualizada'}))
            .catch(e => res.send(e));
    },

    async delete(req, res) {
        const {id_relacao} = req.params;
        await AnimaisLotes.findByPk(id_relacao)
            .then(relacao => relacao.destroy())
            .then(relacao => res.json({relacao, Status: 'Relação removida com sucesso!'}))
            .catch(e => res.json({e, Erro: 'Relação não encontrada'}));
    }
}