import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';

import Animal from '../models/Animal';

class AnimalController {
  async criar(req, res) {
    //validação de dados
    const schema = Yup.object().shape({
      no_animal: Yup.string().required('Campo no_animal é obrigatório'),
      no_raca: Yup.string().required('Campo no_raca é obrigatório'),
      vr_peso: Yup.number()
        .positive('Campo no_peso não pode ser negativo')
        .required('Campo no_peso é obrigatório'),
      sexo: Yup.string()
        .required('Campo sexo é obrigatório')
        .max(1, 'Este campo recebe apenas um caractere'),
      dt_nascimento: Yup.date().required('Campo dt_nascimento é obrigatório'),
      fk_id_pessoa: Yup.string()
        .uuid()
        .required('Campo id_pessoa é obrigatório'),
    });

    //retorna se os dados são invalidos
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'Falha na validação de dados, tente novamente',
      });
    }

    const {
      no_animal,
      no_raca,
      vr_peso,
      sexo,
      dt_nascimento,
      fk_id_pessoa,
    } = req.body;

    const id = uuid();
    // cria objeto a ser armazenado
    const novoAnimal = {
      id,
      no_animal,
      no_raca,
      vr_peso,
      sexo,
      dt_nascimento,
      fk_id_pessoa,
    };

    try {
      await Animal.create(novoAnimal);

      return res.status(200).json({
        status: 'sucesso',
        pessoa: {
          no_animal,
          no_raca,
          dt_nascimento,
        },
      });
    } catch (err) {
      //retorna se conexao com banco falhou
      return res.status(400).json({
        status: 'falha',
        message: err,
      });
    }
  }
  async atualizar(req, res) {
    //validação de dados
    const schema = Yup.object().shape({
      no_animal: Yup.string(),
      no_raca: Yup.string(),
      vr_peso: Yup.number().positive('Campo no_peso não pode ser negativo'),
      sexo: Yup.string().max(1, 'Este campo recebe apenas um caractere'),
      dt_nascimento: Yup.date(),
      fk_id_pessoa: Yup.string().uuid(),
    });

    //retorna se os dados são invalidos
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'Falha na validação de dados, tente novamente',
      });
    }

    const animalAtualizar = await Animal.findByPk(req.params.id);

    if (!animalAtualizar) {
      return res.status(400).json({
        status: 'falha',
        message: 'Animal não encontrado no banco de dados',
      });
    }

    try {
      const { no_animal, no_raca } = await animalAtualizar.update(req.body);
      return res.status(200).json({
        status: 'sucesso',
        no_animal,
        no_raca,
      });
    } catch (err) {
      return res.status(400).json({
        status: 'falha',
        message: err,
      });
    }
  }

  async listarTodos(req, res) {
    try {
      const listaAnimais = await Animal.findAll();
      return res.status(200).json({
        status: 'sucesso',
        listaAnimais,
      });
    } catch (err) {
      return res.status(400).json({
        status: 'falha',
        message: err,
      });
    }
  }

  async detalheAnimal(req, res) {
    try {
      const animal = await Animal.findByPk(req.params.id);
      if (!animal) {
        return res.status(400).json({
          status: 'falha',
          message: 'Animal não encontrado',
        });
      }
      return res.status(200).json({
        status: 'sucesso',
        animal,
      });
    } catch (err) {
      return res.status(400).json({
        status: 'falha',
        message: err,
      });
    }
  }

  async deletar(req, res) {
    const animal = await Animal.findByPk(req.params.id);

    if (!animal) {
      return res.status(400).json({
        status: 'falha',
        message: 'Animal não encontrado',
      });
    }
    try {
      await animal.destroy();
      return res.status(200).json({
        status: 'sucesso',
        message: 'Deleção efetuada',
      });
    } catch (err) {
      return res.status(400).json({
        status: 'falha',
        message: err,
      });
    }
  }
}

export default new AnimalController();
