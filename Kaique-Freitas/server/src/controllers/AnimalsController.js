const SaveAnimalService = require('../services/animalServices/saveAnimalService');
const DeleteAnimalService = require('../services/animalServices/deleteAnimalService');
const FindAnimalService = require('../services/animalServices/findAnimalService');
const GetAllAnimalsService = require('../services/animalServices/getAllAnimalsService');

class AnimalsController {
  async index(response) {
    try {
      const animals = await new GetAllAnimalsService().execute();
      return response.json({ error: false, animals });
    } catch {
      return response.json({
        error: true,
        message: 'Erro ao procurar animais',
      });
    }
  }

  async save(request, response) {
    try {
      await new SaveAnimalService().execute(request.body);

      return response.json({
        error: false,
        message: 'Sucesso ao salvar animal',
      });
    } catch {
      return response.json({
        error: true,
        message: 'Erro ao salvar animal',
      });
    }
  }

  async show(request, response) {
    try {
      const animal = await new FindAnimalService().execute(request.params);
      return response.json({ error: false, animal });
    } catch {
      return response.json({
        error: true,
        message: 'Erro ao procurar animal',
      });
    }
  }

  async delete(request, response) {
    try {
      await new DeleteAnimalService().execute(request.params);

      return response.json({
        error: false,
        message: 'Animal excluído com sucesso',
      });
    } catch {
      return response.json({
        error: true,
        message: 'Erro ao excluir animal',
      });
    }
  }
}

module.exports = { AnimalsController };
