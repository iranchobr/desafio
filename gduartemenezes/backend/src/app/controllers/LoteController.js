import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';

import Lote from '../models/Lote';

class LoteController {
  async criar(req, res) {
    //validação de dados
    const schema = Yup.object().shape({
      no_lote: Yup.string().required('Campo no_lote é obrigatório'),
      ds_lote: Yup.string().required('Campo ds_lote é obrigatório'),
    });

    //retorna se os dados são invalidos
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'Falha na validação de dados, tente novamente',
      });
    }

    const { no_lote, ds_lote } = req.body;
    const id = uuid();
    // cria objeto a ser armazenado
    const novoLote = {
      id,
      no_lote,
      ds_lote,
    };

    try {
      await Lote.create(novoLote);

      return res.status(200).json({
        status: 'sucesso',
        novoLote,
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
      no_lote: Yup.string(),
      ds_lote: Yup.string(),
    });

    const loteAtualizar = await Lote.findByPk(req.params.id);

    if (!loteAtualizar) {
      return res.status(400).json({
        status: 'falha',
        message: 'Lote não encontrado no banco de dados',
      });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'Falha na validação de dados, tente novamente',
      });
    }

    try {
      const loteAtualizado = await loteAtualizar.update(req.body);
      return res.status(200).json({
        status: 'sucesso',
        loteAtualizado,
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
      const listaLotes = await Lote.findAll();
      return res.status(200).json({
        status: 'sucesso',
        listaLotes,
      });
    } catch (err) {
      return res.status(400).json({
        status: 'falha',
        message: err,
      });
    }
  }

  async detalheLote(req, res) {
    try {
      const lote = await Lote.findByPk(req.params.id);
      if (!lote) {
        return res.status(400).json({
          status: 'falha',
          message: 'lote não encontrado',
        });
      }
      return res.status(200).json({
        status: 'sucesso',
        lote,
      });
    } catch (err) {
      return res.status(400).json({
        status: 'falha',
        message: err,
      });
    }
  }

  async deletar(req, res) {
    const loteDeletar = await Lote.findByPk(req.params.id);

    if (!loteDeletar) {
      return res.status(400).json({
        status: 'falha',
        message: 'Lote não encontrado',
      });
    }
    try {
      await loteDeletar.destroy();
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

export default new LoteController();
