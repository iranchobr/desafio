const Animal = require('../../models/Animal');

class GetAllAnimalsService {
  async execute() {
    const animals = await Animal.findAll();
    return animals;
  }
}

module.exports = GetAllAnimalsService;
