const People = require('../../models/People');

class DeletePeopleService {
  async execute({ id }) {
    await People.destroy({ where: { id } });
  }
}

module.exports = DeletePeopleService;
