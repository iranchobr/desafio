const express = require("express");
const router = express.Router();
const Animal = require("../models/animal");
const Pessoa = require("../models/pessoa");

const listar = async (req, res) => {
  try {
    const animal = await Animal.findAll();
    return res.send(animal);
  } catch (err) {
    return res
      .status(500)
      .send({ error: "Erro na consulta de usuários" + err });
  }
};

const listaPessoa = async (req, res) => {
  try {
    const pessoa = await Pessoa.findAll({ where: { ic_ativo: true } });
    res.send(pessoa);
  } catch (err) {
    return res.status(500).send({ error: "Erro na consulta de animal" + err });
  }
};

const criar = async (req, res) => {
  try {
    const {
      fk_id_pessoa,
      id_fazenda,
      no_animal,
      no_raca,
      sexo,
      vr_peso,
      dt_nascimento,
    } = req.body;
    console.log(req.body);
    const animal = await Animal.create({
      fk_id_pessoa,
      id_fazenda,
      no_animal,
      no_raca,
      sexo,
      vr_peso,
      dt_nascimento,
    });
    return res.send(animal);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Erro ao cadatrar animal " + err });
  }
};

const atualizar = async (req, res) => {
  const {
    fk_id_pessoa,
    id_fazenda,
    no_animal,
    no_raca,
    sexo,
    vr_peso,
    dt_nascimento,
  } = req.body.animal;

  try {
    const AcharAnimal = await Animal.findOne({ where: { id: req.params.id } });
    if (!AcharAnimal)
      return res.status(400).send({ error: "Animal não registrado!" });
    const animal = await Animal.update(
      {
        fk_id_pessoa,
        id_fazenda,
        no_animal,
        no_raca,
        sexo,
        vr_peso,
        dt_nascimento,
      },
      { where: { id: req.params.id } }
    );
    return res.send(animal);
  } catch (err) {
    res.send("Erro ao atualizar Animal!" + err);
  }
};

const deletar = async (req, res) => {
  try {
    await Animal.destroy({ where: { id: req.params.id } });
    res.send(`Foi deletado com sucesso!`);
  } catch (err) {
    res.send("Erro ao deletar animal " + err);
  }
};

module.exports = { listar, listaPessoa, criar, atualizar, deletar };
