import { Model, Sequelize } from 'sequelize';

class Lote extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        no_lote: Sequelize.STRING,
        ds_lote: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Lote;
