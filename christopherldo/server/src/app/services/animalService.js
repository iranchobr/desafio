const {
  Animal
} = require('../models');

module.exports = {
  create: async animalObject => {
    return await Animal.create(animalObject);
  },
  readAll: async () => {
    return await Animal.findAll();
  },
  readById: async id => {
    return await Animal.findOne({
      where: {
        id,
      },
    });
  },
  update: async animalObject => {
    return await Animal.update(animalObject, {
      where: {
        id: animalObject.id,
      },
    });
  },
  delete: async id => {
    return await Animal.destroy({
      where: {
        id,
      },
    });
  },
};