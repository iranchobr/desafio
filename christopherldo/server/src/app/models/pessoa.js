module.exports = (sequelize, DataTypes) => {
  const pessoa = sequelize.define('Pessoa', {
    no_pessoa: DataTypes.STRING,
    no_email: DataTypes.STRING,
    endereco: DataTypes.STRING,
    sexo: DataTypes.STRING,
    ic_ativo: DataTypes.BOOLEAN,
  }, {
    tableName: 'pessoa',
  });

  return pessoa;
};