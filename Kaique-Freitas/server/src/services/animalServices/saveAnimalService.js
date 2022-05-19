const Animal = require('../../models/Animal');

class SaveAnimalService {
  async execute(data) {
    const { id, name, people_id, gender, breed, weight, birth_date } = data;

    let animal;

    if (id) {
      const animalSaved = await Animal.findByPk(id);

      animal = animalSaved;
    } else animal = new Animal();

    animal.setAttributes({
      name,
      people_id,
      breed,
      weight,
      birth_date,
      gender,
    });

    await animal.save()
  }
}

module.exports = SaveAnimalService;
