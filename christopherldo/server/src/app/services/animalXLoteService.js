const {
  AnimalXLote
} = require('../models');

module.exports = {
  create: async animalXLoteObject => {
    return await AnimalXLote.create(animalXLoteObject);
  },
  readAll: async () => {
    return await AnimalXLote.findAll();
  },
  readById: async id => {
    return await AnimalXLote.findOne({
      where: {
        id,
      },
    });
  },
  update: async animalXLoteObject => {
    return await AnimalXLote.update(animalXLoteObject, {
      where: {
        id: animalXLoteObject.id,
      },
    });
  },
  delete: async id => {
    return await AnimalXLote.destroy({
      where: {
        id,
      },
    });
  },
};