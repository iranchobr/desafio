const Lot = require('../../models/Lot');

class GetAllLotsService {
  async execute() {
    const lots = await Lot.findAll();
    return lots
  }
}

module.exports = { GetAllLotsService };
