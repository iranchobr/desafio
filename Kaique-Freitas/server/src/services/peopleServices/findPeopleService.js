const People = require('../../models/People');

class FindPeopleService {
  async execute({ id }) {
    const people = await People.findByPk(id);
    return people || [];
  }
}

module.exports = FindPeopleService;
