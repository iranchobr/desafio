const { DeleteLotService } = require('../services/lotServices/deleteLotService');
const { FindLotService } = require('../services/lotServices/findLotService');
const { GetAllLotsService } = require('../services/lotServices/getAllLotsService');
const { SaveLotService } = require('../services/lotServices/saveLotService');

class LotsController {
  async index(response) {
    try {
      const lots = await new GetAllLotsService().execute();
      return response.json({ error: false, lots });
    } catch {
      return response.json({ error: true, message: 'Erro ao procurar lotes' });
    }
  }

  async save(request, response) {
    try {
      await new SaveLotService().execute(request.body);

      return response.json({
        error: false,
        message: 'Sucesso ao salvar lote',
      });
    } catch {
      return response.json({
        error: true,
        message: 'Erro ao salvar lote',
      });
    }
  }

  async show(request, response) {
    try {
      const lot = await new FindLotService().execute(request.params);
      return response.json({ error: false, lot });
    } catch {
        return response.json({
            error: true, 
            message: 'Erro ao procurar lote'
        })
    }
  }

  async delete(request, response) {
    try {
      await new DeleteLotService().execute(request.params);

      return response.json({
        error: false,
        message: 'Lote excluído com sucesso',
      });
    } catch {
      return response.json({
        error: true,
        message: 'Erro ao excluir lote',
      });
    }
  }
}

module.exports = { LotsController };
