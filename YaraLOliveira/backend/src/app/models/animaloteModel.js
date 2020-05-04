const {Model, DataTypes} = require('sequelize');
class Animalote extends Model {
  static init (sequelize){
    super.init(
      {
        id_fk_animal: DataTypes.INTEGER,
        id_fk_lote: DataTypes.INTEGER,
        dt_entrada: DataTypes.DATE,
        dt_saida: DataTypes.DATE,
        ativo_bez: DataTypes.BOOLEAN
      },
      {sequelize},
      (Animalote.associate = (models) => {
        Animalote.belongsTo(models.LoteModel, { 
          as: "loteAnimal", //pertence como
          foreignKey: "id_fk_lote", // chave estrangeira
          onUpdate: "CASCADE", //ATUALIZA -> com tabela pai
          onDelete: "CASCADE", //DELETA -> se o pai for deletado
        }),
        Animalote.belongsToMany(models.AnimalModel, {
          as: "animaisLotes", //pertence como
          foreignKey: "id_fk_animal", // chave estrangeira
          onUpdate: "CASCADE", //ATUALIZA -> com tabela pai
          onDelete: "CASCADE", //DELETA -> se o pai for deletado
        });
      })
    );
  };
} 
module.exports = Animalote;