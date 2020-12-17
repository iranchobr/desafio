const Animal = require("../models/animalMode");
const Pessoa = require("../models/pessoaModel");
const connection = require("../../database/index");
Animal.init(connection);

class animalController {
  async store(req, res) {
     {
      Pessoa.findByPk(req.body.fk_id_pessoas)
      .then(resp =>{
        if(resp){ 
          Animal.create(req.body)
          .then( resp => res.status(200).send(resp))
        }else{ 
          res.status(400).send({error: 'id invalido'})
        }
      })
      .catch( error => res.status(400).send(error));
    }
}

  async update(req, res) {
    await Animal.findByPk(req.params.id)
      .then((animal) => {
        animal.update(req.body).then((resp) => {
          console.log("atualizado" + resp);
          res.status(200).json(resp);
        });
      })
      .catch((error) =>
        res.status(400).send({ error: "falha atualizar" }, error)
      );
  }

  async delete(req, res) {
    await Animal.findByPk(req.params.id)
      .then((animal) => {
        if (animal) {
          animal.destroy();
          res.status(200).json(animal);
        } else {
          res.status(400).send({ error: `lote ${animal.nome} deletado` });
        }
      })
      .catch((error) =>
        res.status(401).send({ message: " falha ao deletar" }, error)
      );
  }

  async get(req, res) {
    if (req.params.id) {
      await Animal.findByPk(req.params.id)
        .then((resp) => {
          if (resp) {
            console.log(resp);
            res.status(200).json(resp);
          } else {
            console.log(error);
            resp.status(400).send({ error: " animal nao encontrado" });
          }
        })
        .catch((error) =>
          res.status(400).send(error, { error: " falha ao  buscar animal" })
        );
    } else {
      await Animal.findAll()
        .then((resp) => {
          res.status(200).json(resp);
        })
        .catch((error) => res.status(400).send(error));
    }
  }
}

module.exports = new animalController();
