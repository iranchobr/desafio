const Animal = require('../../models/Animal');

class FindAnimalService {
    async execute({ id }) {
      const animal = await Animal.findByPk(id);
      return animal || [];
    }
  }
  
  module.exports = FindAnimalService;