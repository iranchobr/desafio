const Lot = require('../../models/Lot');

class FindLotService {
  async execute({ id }) {
    const lot = await Lot.findByPk(id);
    return lot || [];
  }
}

module.exports = { FindLotService };
