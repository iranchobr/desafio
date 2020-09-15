import { Model, Sequelize } from 'sequelize';

class AnimalLote extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        dt_entrada: Sequelize.DATE,
        dt_saida: Sequelize.DATE,
        dt_ultima_movimentacao: Sequelize.DATE,
        ic_bezerro: Sequelize.BOOLEAN,
        fk_id_animal: Sequelize.UUID,
        fk_id_lote: Sequelize.UUID,
      },
      {
        sequelize,
      }
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.Animal, { foreignKey: 'fk_id_animal', as: 'animal' });
    this.belongsTo(models.Lote, { foreignKey: 'fk_id_lote', as: 'lote' });
  }
}

export default AnimalLote;
