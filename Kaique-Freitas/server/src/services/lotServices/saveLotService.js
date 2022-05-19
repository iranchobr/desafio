const Lot = require('../../models/Lot');

class SaveLotService {
  async execute(data) {
    const { id, name, description } = data;

    let lot;

    if (id) {
      const lotSaved = await Lot.findByPk(id);

      lot = lotSaved;
    } else lot = new Lot();

    lot.setAttributes({
      name,
      description,
    });

    await lot.save();
  }
}

module.exports = { SaveLotService };
