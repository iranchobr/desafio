const connection = require("../../database/index");
const Lote = require("../models/loteModel");
Lote.init(connection);

class loteController {
  async store(req, res) {
    //if - verivicação de campo vazio
    if (req.body.nome != undefined && req.body.descricao != undefined) {
      // post -> create
      await Lote.create(req.body)
        .then((response) => {
          console.log("create" + response);
          res.status(200).json(response);
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send({ error: "falha ao cadastrar" });
        });
    } else {
      res.status(400).send({ error: "campos vazios ou nulos" });
    }
  }

  async update(req, res) {
    await Lote.findByPk(req.params.id)
      .then((lote) => {
        lote.update(req.body).then((response) => {
          console.log("atualizado" + response);
          res.status(200).json(response);
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send({ error: "falha ao atualizar" });
      });
  }

  async get(req, res) {
    if (req.params.id) {
      await Lote.findByPk(req.params.id)
        .then((response) => {
          if (response) {
            console.log(response);
            res.status(200).json(response);
          } else {
            console.log(error);
            res.status(400).send({ error: "lote nao encontrado" });
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send({ error: "falha ao buscar lote" });
        });
    } else {
      await Lote.findAll()
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send({ error: "falha ao listar lotes" });
        });
    }
  }

  async delete(req, res) {
    await Lote.findByPk(req.params.id)
      .then((lote) => {
        if (lote) {
          lote.destroy();
          res.status(200).json({ message: `lote ${lote.nome} deletado` });
        }
        res.status(400).send({ message: "lote nao encontrado" });
      })
      .catch((erro) => {
        console.log(erro);
        res.status(401).send({ message: "falha ao deletar lote" });
      });
  }
}
module.exports = new loteController();
