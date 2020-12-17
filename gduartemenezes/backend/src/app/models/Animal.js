import { Model, Sequelize } from 'sequelize';

class Animal extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        no_animal: Sequelize.STRING,
        no_raca: Sequelize.STRING,
        vr_peso: Sequelize.DOUBLE,
        sexo: Sequelize.CHAR,
        dt_nascimento: Sequelize.DATE,
        id_fazenda: Sequelize.UUID,
      },
      {
        sequelize,
      }
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.Pessoa, { foreignKey: 'fk_id_pessoa', as: 'pessoa' });
  }
}

export default Animal;
