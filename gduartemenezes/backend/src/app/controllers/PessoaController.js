import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';

import Pessoa from '../models/Pessoa';

class PessoaController {
  async criar(req, res) {
    //validação de dados
    const schema = Yup.object().shape({
      no_pessoa: Yup.string().required('Campo no_pessoa é obrigatório'),
      no_email: Yup.string()
        .email('Tipo do campo é email')
        .required('Campo no_email é obrigatório'),
      endereco: Yup.string().required('Campo endereco é obrigatório'),
      sexo: Yup.string()
        .required('Campo sexo é obrigatório')
        .max(1, 'Este campo recebe apenas um caractere'),
      ativo: Yup.bool(),
    });

    //retorna se os dados são invalidos
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'Falha na validação de dados, tente novamente',
      });
    }

    const emailRegistrado = await Pessoa.findOne({
      where: {
        no_email: req.body.no_email,
      },
    });
    // retorna se o email já está registrado
    if (emailRegistrado) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'Email já registrado, use outro para proseguir',
      });
    }

    const { no_pessoa, no_email, endereco, sexo, ativo } = req.body;
    const id = uuid();
    // cria objeto a ser armazenado
    const novaPessoa = {
      id,
      no_pessoa,
      no_email,
      endereco,
      sexo,
      ativo,
    };

    try {
      await Pessoa.create(novaPessoa);

      return res.status(200).json({
        status: 'sucesso',
        pessoa: {
          no_pessoa,
          no_email,
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
      no_pessoa: Yup.string(),
      no_email: Yup.string().email('Tipo do campo é email'),
      endereco: Yup.string(),
      sexo: Yup.string().max(1, 'Este campo recebe apenas um caractere'),
      ativo: Yup.bool(),
    });

    const pessoaAtualizar = await Pessoa.findByPk(req.params.id);

    if (!pessoaAtualizar) {
      return res.status(400).json({
        status: 'falha',
        message: 'Pessoa não encontrada no banco de dados',
      });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'Falha na validação de dados, tente novamente',
      });
    }

    const emailRegistrado =
      pessoaAtualizar.no_email !== req.body.no_email
        ? await Pessoa.findOne({
            where: {
              no_email: req.body.no_email,
            },
          })
        : null;

    // retorna se o email já está registrado
    if (emailRegistrado) {
      return res.status(400).json({
        status: 'Bad Request',
        message:
          'Email já registrado, use outro para proseguir com a atualização',
      });
    }

    try {
      const pessoaAtualizada = await pessoaAtualizar.update(req.body);
      return res.status(200).json({
        status: 'sucesso',
        pessoaAtualizada,
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
      const listaPessoas = await Pessoa.findAll();
      return res.status(200).json({
        status: 'sucesso',
        listaPessoas,
      });
    } catch (err) {
      return res.status(400).json({
        status: 'falha',
        message: err,
      });
    }
  }

  async detalhePessoa(req, res) {
    try {
      const pessoa = await Pessoa.findByPk(req.params.id);
      if (!pessoa) {
        return res.status(400).json({
          status: 'falha',
          message: 'pessoa não encontrada',
        });
      }
      return res.status(200).json({
        status: 'sucesso',
        pessoa,
      });
    } catch (err) {
      return res.status(400).json({
        status: 'falha',
        message: err,
      });
    }
  }

  async deletar(req, res) {
    const pessoaDeletar = await Pessoa.findByPk(req.params.id);

    if (!pessoaDeletar) {
      return res.status(400).json({
        status: 'falha',
        message: 'Pessoa não encontrada',
      });
    }
    try {
      await pessoaDeletar.destroy();
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

export default new PessoaController();
