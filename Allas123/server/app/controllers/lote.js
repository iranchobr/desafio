const Sequelize = require("sequelize");
const Lote = require("../models/lote");
const Op = Sequelize.Op;


exports.create = (req, res) => {

    if (!req.body.no_lote) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }


    const lote = {
        no_lote: req.body.no_lote,
        ds_lote: req.body.ds_lote
    };

    Lote.create(lote)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the lot."
            });
        });
};

exports.findAll = (req, res) => {
    const lote = req.query.no_lote;
    var condition = lote ? { no_lote: { [Op.like]: `%${lote}%` } } : null;

    Lote.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving lot."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Lote.findByPk(id)
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Lot with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Lote.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Lot was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Lot with id=${id}. Maybe Lot was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Lot with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Lote.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Lot with id=${id}. Maybe lot was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Lot with id=" + id
            });
        });
};
