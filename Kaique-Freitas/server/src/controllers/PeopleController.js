const SavePeopleService = require('../services/peopleServices/savePeopleService');
const DeletePeopleService = require('../services/peopleServices/deletePeopleService');
const FindPeopleService = require('../services/peopleServices/findPeopleService');
const GetAllPeopleService = require('../services/peopleServices/getAllPeopleService');

class PeopleController {
  async index(response) {
    try {
      const people = await new GetAllPeopleService().execute();
      return response.json({ error: false, people });
    } catch {
      return response.json({
        error: true,
        message: 'Erro ao procurar pessoas',
      });
    }
  }
  
  async save(request, response) {
    try {
      await new SavePeopleService().execute(request.body);

      return response.json({
        error: false,
        message: 'Sucesso ao salvar pessoa',
      });
    } catch {
      return response.json({
        error: true,
        message: 'Erro ao salvar pessoa',
      });
    }
  }

  async show(request, response) {
    try {
      const people = await new FindPeopleService().execute(request.params);
      return response.json({ error: false, people });
    } catch {
      return response.json({
        error: true,
        message: 'Erro ao procurar pessoa',
      });
    }
  }
  
  async delete(request, response) {
    try {
      await new DeletePeopleService().execute(request.params);

      return response.json({
        error: false,
        message: 'Pessoa excluída com sucesso',
      });
    } catch {
      return response.json({
        error: true,
        message: 'Erro ao excluir pessoa',
      });
    }
  }
}

module.exports = { PeopleController };
