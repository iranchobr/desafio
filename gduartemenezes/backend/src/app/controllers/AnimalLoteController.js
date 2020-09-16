import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';

import AnimalLote from '../models/AnimalLote';

class AnimalLoteController {
  async criar(req, res) {
    //validação de dados
    const schema = Yup.object().shape({
      dt_entrada: Yup.date().required('Campo dt_entrada é obrigatório'),
      dt_saida: Yup.date(),
      dt_ultima_movimentacao: Yup.date(),
      ic_bezerro: Yup.bool(),
      fk_id_animal: Yup.string()
        .uuid()
        .required('Campo id_animal é obrigatório'),
      fk_id_lote: Yup.string().uuid().required('Campo id_lote é obrigatório'),
    });

    //retorna se os dados são invalidos
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'Falha na validação de dados, tente novamente',
      });
    }

    const {
      dt_entrada,
      dt_saida,
      dt_ultima_movimentacao,
      ic_bezerro,
      fk_id_animal,
      fk_id_lote,
    } = req.body;

    const id = uuid();
    // cria objeto a ser armazenado
    const novoRegistro = {
      id,
      dt_entrada,
      dt_saida,
      dt_ultima_movimentacao,
      ic_bezerro,
      fk_id_animal,
      fk_id_lote,
    };

    try {
      await AnimalLote.create(novoRegistro);

      return res.status(200).json({
        status: 'sucesso',
        registro: {
          dt_entrada,
          ic_bezerro,
          fk_id_animal,
          fk_id_lote,
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
      dt_entrada: Yup.date(),
      dt_saida: Yup.date(),
      dt_ultima_movimentacao: Yup.date().required(
        'Campo dt_ultima_movimentacao é obrigatório'
      ),
      ic_bezerro: Yup.bool(),
      fk_id_animal: Yup.string().uuid(),
      fk_id_lote: Yup.string().uuid(),
    });

    //retorna se os dados são invalidos
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'Falha na validação de dados, tente novamente',
      });
    }
    const registroAtualizar = await AnimalLote.findByPk(req.params.id);

    if (!registroAtualizar) {
      return res.status(400).json({
        status: 'falha',
        message: 'Registro não encontrado no banco de dados',
      });
    }

    try {
      const registroAtualizado = await registroAtualizar.update(req.body);
      return res.status(200).json({
        status: 'sucesso',
        registroAtualizado,
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
      const listaRegistros = await AnimalLote.findAll();
      return res.status(200).json({
        status: 'sucesso',
        listaRegistros,
      });
    } catch (err) {
      return res.status(400).json({
        status: 'falha',
        message: err,
      });
    }
  }

  async detalheRegistro(req, res) {
    try {
      const registro = await AnimalLote.findByPk(req.params.id);
      if (!registro) {
        return res.status(400).json({
          status: 'falha',
          message: 'Registro não encontrado',
        });
      }
      return res.status(200).json({
        status: 'sucesso',
        registro,
      });
    } catch (err) {
      return res.status(400).json({
        status: 'falha',
        message: err,
      });
    }
  }

  async deletar(req, res) {
    const registro = await AnimalLote.findByPk(req.params.id);

    if (!registro) {
      return res.status(400).json({
        status: 'falha',
        message: 'Registro não encontrado',
      });
    }
    try {
      await registro.destroy();
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

export default new AnimalLoteController();
