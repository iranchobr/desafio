const Sequelize = require("sequelize");
const Pessoa = require("../models/pessoa");
const Op = Sequelize.Op;


exports.create = (req, res) => {


    if (!req.body.no_pessoa) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const pessoa = {
        no_pessoa: req.body.no_pessoa,
        no_email: req.body.no_email,
        endereco: req.body.endereco,
        sexo: req.body.sexo,
        ic_ativo: req.body.ic_ativo
    };

    Pessoa.create(pessoa)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Person."
            });
        });
};

exports.findAll = (req, res) => {
    const pessoa = req.query.no_pessoa;
    var condition = pessoa ? { no_pessoa: { [Op.like]: `%${pessoa}%` } } : null;

    Pessoa.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving People."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Pessoa.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Pessoa.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Person with id=${id}. Maybe Person was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Person with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Pessoa.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Person with id=${id}. Maybe Person was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Person with id=" + id
            });
        });
};
