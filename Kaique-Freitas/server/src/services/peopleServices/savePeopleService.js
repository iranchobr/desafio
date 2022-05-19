const People = require('../../models/People');

class SavePeopleService {
  async execute(data) {
    const { id, name, email, address, gender, ic_active } = data;

    let people;

    if (id) {
      const peopleSaved = await People.findByPk(id);

      people = peopleSaved;
    } else people = new People();

    people.setAttributes({
      name,
      email,
      address,
      gender,
      ic_active,
    });

    await people.save();
  }
}

module.exports = SavePeopleService;
