module.exports = (sequelize, DataTypes) => {
  const animal = sequelize.define('Animal', {
    fk_id_pessoa: DataTypes.INTEGER,
    id_fazenda: DataTypes.INTEGER,
    no_animal: DataTypes.STRING,
    no_raca: DataTypes.STRING,
    sexo: DataTypes.STRING,
    vr_peso: DataTypes.DECIMAL,
    dt_nascimento: DataTypes.DATE
  }, {
    tableName: 'animal',
  });

  return animal;
};