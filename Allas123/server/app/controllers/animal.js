const Animal = require("../models/animal");
const Pessoa = require("../models/pessoa");


exports.create = (req, res) => {

    if (!req.body.no_animal) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const animal = {
        id_pessoa: req.body.id_pessoa,
        id_fazenda: req.body.id_fazenda,
        no_animal: req.body.no_animal,
        no_raca: req.body.no_raca,
        sexo: req.body.sexo,
        vr_peso: req.body.vr_peso,
        dt_nascimento: req.body.dt_nascimento
    };

    Animal.create(animal)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Animal."
            });
        });
};

exports.findAll = (req, res) => {

    Animal.findAll({
        include: [{
            model: Pessoa,
            required: true
        }]
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Animals."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Animal.findAll({
        include: [{
            model: Pessoa,
            required: true
        }],
        where:{ id : id}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Animal with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Pessoa.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Animal with id=${id}. Maybe Animal was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Animal with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Animal.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Animal with id=${id}. Maybe Animal was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Animal with id=" + id
            });
        });
};
