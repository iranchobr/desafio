const connection = require('../../database/index');
const Animal = require('../models/animalModel');
const Pessoa = require('../models/pessoaModel');
Animal.init(connection);

class animalController {

  async store (req, res){
    if (
      req.body.fk_id_pessoas != undefined &&
      req.body.id_fazenda != undefined &&
      req.body.nome != undefined &&
      req.body.raca != undefined &&
      req.body.sexo != undefined &&
      req.body.peso != undefined &&
      req.body.nascimento != undefined
    ){
      Pessoa.findByPk(req.body.fk_id_pessoas)
        .then(resp =>{
          if(resp){// true ->  
            Animal.create(req.body)
            .then( resp => res.status(200).send(resp))
          }else{ // false -> undefined or null
            res.status(400).send({error: 'id invalido'})
          }
        })
        .catch( error => res.status(400).send(error));
    }else{ 
      res.status(400).send({ error : 'falta de dados'})
    }
  }
 
  async update(req, res){
    await Animal.findByPk(req.params.id)
    .then((animal) =>{
      animal.update(req.body)
      .then((resp) => {
        console.log('atualizado' + resp)
        res.status(200).json(resp)     
       })
    })
    .catch(error => res.status(400).send({error :"falha atualizar"}, error ));
  }

  async delete (req, res) {
    await Animal.findByPk(req.params.id)
    .then((animal) =>{
      if(animal){
        animal.destroy();
        res.status(200).json(animal)
      }else{
        res.status(400).send({error :`lote ${animal.nome} deletado`})
      }
    })
    .catch(error => res.status(401).send({message : " falha ao deletar"}, error));
  }

  async get (req, res){
    if(req.params.id){
      await Animal.findByPk(req.params.id)
      .then(resp =>{
        if(resp){
          console.log(resp);
          res.status(200).json(resp)
        }else{
          console.log(error);
          resp.status(400).send({error : " animal nao encontrado"});
        }
      })
      .catch(error => res.status(400).send(error, {error :" falha ao  buscar animal"}));
    }else{
      await Animal.findAll()
      .then(resp =>{
        res.status(200).json(resp);
      })
      .catch(error => res.status(400).send(error));
    }
  }
}

module.exports = new animalController();