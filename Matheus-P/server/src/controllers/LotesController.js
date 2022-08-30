const Lote = require("../models/Lotes");

module.exports = {
    create(req, res){
        const {
            no_lote, 
            ds_lote
        } = req.body;

        const lote = {
            no_lote, 
            ds_lote
        };

        Lote.create(lote)
            .then(lote => res.json(lote))
            .catch(e => console.log(e));

    },

    index(req, res) {
        Lote.findAll()
            .then(lotes => lotes && lotes.length ? res.json(lotes) : res.json({Erro: 'Não foram encontrados lotes'}))
            .catch(e => res.send(e));
    },

    show(req, res) {
        const {id_lote} = req.params;
        Lote.findByPk(id_lote)
            .then(lotes => lotes ? res.json(lotes) :  res.json({Erro: 'Lote não encontrado'}))
            .catch(e => console.log(e));
    },

    async update(req, res){
        const {id_lote} = req.params;
        const lote = await Lote.findByPk(id_lote);
        if(!lote){
            return res.json({Erro: 'Lote não encontrado' });
        }
        await lote.update(req.body)
            .then(result => result ? res.json(result) : res.json({Erro: 'Lote não atualizado'}))
            .catch(e => res.send(e))
    },

    async delete(req, res) {
        const {id_lote} = req.params;
        await Lote.findByPk(id_lote)
            .then(lote => lote.destroy())
            .then(lote => res.json({lote, Status: 'Lote removido com sucesso!'}))
            .catch(e => res.json({e, Erro: 'Lote não encontrado'}));
    }
}