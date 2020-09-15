import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Pessoa from '../app/models/Pessoa';
import Animal from '../app/models/Animal';
import Lote from '../app/models/Lote';
import AnimalLote from '../app/models/AnimalLote';

const models = [Pessoa, Animal, Lote, AnimalLote];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
