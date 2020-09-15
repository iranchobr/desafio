import { Model, Sequelize } from 'sequelize';

class Pessoa extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        no_pessoa: Sequelize.STRING,
        no_email: Sequelize.STRING,
        endereco: Sequelize.STRING,
        sexo: Sequelize.CHAR,
        ativo: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Pessoa;
