import { Model, Sequelize } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: Sequelize.UUID,
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
