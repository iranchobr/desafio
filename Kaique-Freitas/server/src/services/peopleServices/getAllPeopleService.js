const People = require('../../models/People');

class GetAllPeopleService {
    async execute() {
      const people = await People.findAll();
      return people
    }
  }
  
  module.exports = GetAllPeopleService;
  