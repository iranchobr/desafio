//controller - controla as requisições http
const connection = require("../../database/index"); // conexão banco/sequelize
const Pessoa = require("../models/pessoaModel"); //  dados da model pessoa
Pessoa.init(connection);// conexão

class pessoaController {
  async store(req, res) {
    console.log(req.body);
    if (
      req.body.nome != undefined &&
      req.body.email != undefined &&
      req.body.endereco != undefined &&
      req.body.sexo != undefined &&
      req.body.ativo != undefined
    ) {
      const pessoaExist = await Pessoa.findOne({
        where: { email: req.body.email },
      });
      if (pessoaExist) {
        return res.status(400).json({ error: "Usuario ja existente" });
      }
      console.log(req.body);
      await Pessoa.create(req.body)
        .then((response) => {
          console.log("create" + response);
          res.status(200).json(response);
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send({ error: "falha ao realizar cadastro" });
        });
    } else {
      res.status(400).send({
          error: "falha ao realizar cadastro há campos nulos ou invalidos",
        });
    }
  }

  async update(req, res) {
    await Pessoa.findByPk(req.params.id)
      .then((pessoa) => {
        pessoa.update(req.body)
        .then((response) => {
          console.log("atualizado" + response);
          res.status(200).json(response);
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send({ message: "falha ao atualizar" });
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
              message: "usuario nao encontrado",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send({
            message: "falha ao buscar usuario",
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
            message: "falha ao listar usuario",
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
            .send({ message: `usuario ${pessoa.nome} deletado com sucesso` });
        }
        res.status(400).send({ message: "usuario nao encontrado" });
      })
      .catch((error) => {
        console.log(error);
        res.status(401).send({ message: "falha ao deletar usuario" });
      }
    );
  }
}
module.exports = new pessoaController();
