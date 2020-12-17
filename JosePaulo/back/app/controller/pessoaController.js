const connection = require("../../database/index");
const Pessoa = require("../models/pessoaModel");
Pessoa.init(connection);

class pessoaController {
  async store(req, res) {
    console.log(req.body);
     {
      const pessoaExiste = await Pessoa.findOne({
        where: { email: req.body.email },
      });
      if (pessoaExiste) {
        return res
          .status(400)
          .json({ error: "Usuario ja consta como cadastrado" });
      }
      console.log(req.body);
      await Pessoa.create(req.body)
        .then((response) => {
          console.log("create" + response);
          res.status(200).json(response);
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send({ error: "Falha ao realizar cadastro" });
        });
    }
  }

  async update(req, res) {
    await Pessoa.findByPk(req.params.id)
      .then((pessoa) => {
        pessoa.update(req.body).then((response) => {
          console.log("atualizado" + response);
          res.status(200).json(response);
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send({ message: "Falha ao atualizar" });
      });
  }

  async get(req, res) {
    if (req.params.id) {
      await Pessoa.findByPk(req.params.id)
        .then((response) => {
          if (response) {
            console.log(response);
            res.status(200).json(response);
          } else {
            console.log(error);
            res.status(400).send({
              message: "Usuario nao encontrado",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send({
            message: "Falha ao buscar usuario",
          });
        });
    } else {
      await Pessoa.findAll()
        .then((response) => {
          res.status(200).send(response);
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send({
            message: "Falha ao listar usuario",
          });
        });
    }
  }

  async delete(req, res) {
    await Pessoa.findByPk(req.params.id)
      .then((pessoa) => {
        if (pessoa) {
          pessoa.destroy();
          res
            .status(200)
            .send({ message: `Usuario ${pessoa.nome} Deletado com sucesso` });
        }
        res.status(400).send({ message: "Usuario nao encontrado" });
      })
      .catch((error) => {
        console.log(error);
        res.status(401).send({ message: "Falha ao deletar usuario" });
      });
  }
}
module.exports = new pessoaController();
