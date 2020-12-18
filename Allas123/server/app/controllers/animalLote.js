const Sequelize = require("sequelize");

const Animal = require("../models/animal");
const Lote = require("../models/lote");
const AnimalLote = require("../models/animalLote");


exports.create = (req, res) => {

    if (!req.body.dt_entrada) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const animalLote = {
        id_animal: req.body.id_animal,
        id_lote: req.body.id_lote,
        dt_entrada: req.body.dt_entrada,
        dt_saida: req.body.dt_saida,
        dt_ultima_movimentacao: req.body.dt_ultima_movimentacao,
        ic_bezerro: req.body.ic_bezerro

    };

    AnimalLote.create(animalLote)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Animal Lot."
            });
        });
};

exports.findAll = (req, res) => {

    AnimalLote.findAll({
        include: [
            {
                model: Animal,
                required: true
            },
            {
                model: Lote,
                required: true
            }],
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving  Animal Lot."
            });
        });

}

exports.findOne = (req, res) => {
    const id = req.params.id;

    AnimalLote.findAll({
        include: [
            {
                model: Animal,
                required: true
            },
            {
                model: Lote,
                required: true
            }
        ],
        where : { id : id }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving  Animal Lot with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    AnimalLote.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: " Animal Lot was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Animal Lot with id=${id}. Maybe  Animal Lot was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating  Animal Lot with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    AnimalLote.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete  Animal Lot with id=${id}. Maybe Animal was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Animal with id=" + id
            });
        });
};
