const Pessoa = require("../models/Pessoas");
const Animal = require("../models/Animais");

const connection = require("../database/connection"); 


/*Inicializar a conexão com a tabela Pessoa */
Pessoa.init(connection);

module.exports = {
    async store(req, res) {
        const {no_pessoa, no_email, endereco, sexo, ic_ativo} = req.body;

        const user = {
            no_pessoa,
            no_email,
            endereco,
            sexo,
            ic_ativo
        };

        await Pessoa.create(user)
            .then((response) => {
                res.json(response)
            }).catch((error) => {
                console.log('oi', error);
                res.send(e)
            });
            
    },
    async index(req, res) {

        await Pessoa.findAll()
            .then((response) => {
            res.json(response);
            })
            .catch((error) => {
                console.log(error);
                res.json({
                    message: "erro na listagem de usuários",
                });
            });
    },
    async show(req, res){
        const {id_user} = req.params;
        Pessoa.findByPk(id_user)
            .then(user => {
                res.json(user);
            })
            .catch(e => console.log(e));
    },
    async showAnimals(req, res){
        const {id_user} = req.params;

        Animal.findAll({
            where :{
                fk_id_pessoa: id_user
            }
        })
        .then(animais => res.json(animais))
        .catch(e => res.send(e));
    },
    async update(req, res) {
        const {id_user} = req.params;

        const pessoa = await Pessoa.findByPk(id_user);

        if(!pessoa){
            return res.status(400).json({ error: 'User not found' });
        }

        const updated = await pessoa.update(req.body);
        return res.send(updated);
    },
    async delete (req, res) {
        const {id_user} = req.params;
        console.log(id_user)
        Pessoa.findByPk(id_user)
            .then((pessoa) =>{
                pessoa.destroy();
                return res.send(pessoa);
            })
            .catch((err) => {
                console.log(err)
                return res.json({erro: err})
            });
      }
}