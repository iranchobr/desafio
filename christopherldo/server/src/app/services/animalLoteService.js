const {
  AnimalLote
} = require('../models');

module.exports = {
  create: async animalLoteObject => {
    return await AnimalLote.create(animalLoteObject);
  },
  readAll: async () => {
    return await AnimalLote.findAll();
  },
  readById: async id => {
    return await AnimalLote.findOne({
      where: {
        id,
      },
    });
  },
  update: async animalLoteObject => {
    return await AnimalLote.update(animalLoteObject, {
      where: {
        id: animalLoteObject.id,
      },
    });
  },
  delete: async id => {
    return await AnimalLote.destroy({
      where: {
        id,
      },
    });
  },
};