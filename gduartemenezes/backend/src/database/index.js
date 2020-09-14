import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Pessoa from '../app/models/Pessoa';

const models = [Pessoa];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
