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
}

export default new PessoaController();
