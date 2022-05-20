const Animal = require('../../models/Animal');

class FindAnimalService {
  async execute({ id }) {
    await Animal.destroy({ where: { id } });
  }
}

module.exports = FindAnimalService;
