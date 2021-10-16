const Lote = require("../models/Lotes");

module.exports = {
    async store(req, res){
        /* Gravando lote */
        const {no_lote, ds_lote} = req.body;
        Lote.create({no_lote, ds_lote})
            .then(lote => res.json(lote))
            .catch(err => console.log(err));

    },

    async index(req, res) {
       /* Lista todos os Lotes */

        Lote.findAll()
        .then( lotes => {
            return res.json(lotes);
        })
        .catch(err => console.log(err));
    },
    async show(req, res) {
        /* Lista um lote referente a uma pk */
         Lote.findByPk(req.params.id_lote)
         .then( lotes => {
             return res.json(lotes);
         })
         .catch(err => console.log(err));
     },
    async update(req, res){
        /* Validando lote */
        const {id_lote} = req.params;

        const lote = await Lote.findByPk(id_lote);
        if(!lote){
            return res.status(400).json({ error: 'Lote não econtrado' });
        }

        /*Atualizando Animal */
        lote.update(req.body)
            .then(lote => res.json(lote))
            .catch(err => {error : err})
    },
    async delete(req, res){
         /* Validando lote */
        const {id_lote} = req.params;

        const lote = await Lote.findByPk(id_lote);
        if(!lote){
            return res.status(400).json({ error: 'Lote não econtrado' });
        }
        /* Apagando lote */
        lote.destroy()
        .then(lote => {
            return res.json({
                lote,
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