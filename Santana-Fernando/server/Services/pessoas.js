const express = require("express");
const router = express.Router();
const Pessoa = require("../models/pessoa");

const listar = async (req, res) => {
  try {
    const pessoa = await Pessoa.findAll();
    return res.send(pessoa);
  } catch (err) {
    return res
      .status(500)
      .send({ error: "Erro na consulta de usuários" + err });
  }
};

const criar = async (req, res) => {
  try {
    const { nome_pessoa, email, endereco, sexo, ic_ativo } = req.body;

    const pessoa = await Pessoa.create({
      nome_pessoa,
      email,
      endereco,
      sexo,
      ic_ativo,
    });

    return res.send(pessoa);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao criar usuário " + err });
  }
};

const atualizar = async (req, res) => {
  const { nome_pessoa, email, endereco, sexo, ic_ativo } = req.body;
  let pessoa = {
    nome_pessoa: nome_pessoa,
    email: email,
    endereco: endereco,
    sexo: sexo,
    ic_ativo: ic_ativo,
  };
  console.log(pessoa);
  try {
    await Pessoa.update(pessoa, { where: { id: req.params.id } });
    console.log();
    return res.send(req.body);
  } catch (err) {
    res.send("Erro ao atualizar usuário!" + err);
  }
};

const deletar = async (req, res) => {
  try {
    await Pessoa.destroy({ where: { id: req.params.id } });
    res.send(`Foi deletado com sucesso!`);
  } catch (err) {
    res.send("Erro ao deletar usuário " + err);
  }
};

module.exports = { listar, criar, atualizar, deletar };
