const Lot = require('../../models/Lot');

class DeleteLotService {
  async execute({ id }) {
    await Lot.destroy({ where: { id } });
  }
}

module.exports = { DeleteLotService };
