module.exports = (sequelize, DataTypes) => {
  const animal_x_lote = sequelize.define('AnimalXLote', {
    fk_id_animal: DataTypes.INTEGER,
    fk_id_lote: DataTypes.INTEGER,
    dt_entrada: DataTypes.DATE,
    dt_saida: DataTypes.DATE,
    dt_ultima_movimentacao: DataTypes.DATE,
    ic_bezerro: DataTypes.INTEGER
  }, {
    tableName: 'animal_x_lote',
  });

  return animal_x_lote;
};