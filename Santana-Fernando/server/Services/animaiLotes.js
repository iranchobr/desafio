const express = require("express");
const router = express.Router();
const AnimalLote = require("../models/animalLote");

const listar = async (req, res) => {
  try {
    const animalLote = await AnimalLote.findAll();
    return res.send(animalLote);
  } catch (err) {
    return res
      .status(500)
      .send({ error: "Erro na consulta de usuários" + err });
  }
};

const criar = async (req, res) => {
  try {
    const {
      fk_id_animal,
      fk_id_lote,
      dt_entrada,
      dt_saida,
      dt_ultima_movimentacao,
      ic_bezerro,
    } = req.body;

    const animalLote = await AnimalLote.create({
      fk_id_animal,
      fk_id_lote,
      dt_entrada,
      dt_saida,
      dt_ultima_movimentacao,
      ic_bezerro,
    });

    return res.send(animalLote);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao cadatrar animal " + err });
  }
};

const atualizar = async (req, res) => {
  const {
    fk_id_animal,
    fk_id_lote,
    dt_entrada,
    dt_saida,
    dt_ultima_movimentacao,
    ic_bezerro,
  } = req.body.animalLote;

  try {
    const AcharAnimalLote = await AnimalLote.findOne({
      where: { id: req.params.id },
    });
    if (!AcharAnimalLote)
      return res.status(400).send({ error: "Animal não registrado!" });

    const animalLote = await AnimalLote.update(
      {
        fk_id_animal,
        fk_id_lote,
        dt_entrada,
        dt_saida,
        dt_ultima_movimentacao,
        ic_bezerro,
      },
      { where: { id: req.params.id } }
    );

    return res.send(animalLote);
  } catch (err) {
    res.send("Erro ao atualizar Animal!" + err);
  }
};

const deletar = async (req, res) => {
  try {
    await AnimalLote.destroy({ where: { id: req.params.id } });
    res.send(`Foi deletado com sucesso!`);
  } catch (err) {
    res.send("Erro ao deletar animal " + err);
  }
};

module.exports = { listar, criar, atualizar, deletar };
