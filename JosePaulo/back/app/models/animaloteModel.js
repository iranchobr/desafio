const {Model, DataTypes} = require('sequelize');
class Animalotes extends Model {
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
      (Animalotes.associate = (models) => {
        Animalote.belongsTo(models.LoteModel, { 
          as: "loteAnimal", 
          foreignKey: "id_fk_lote", 
          onUpdate: "CASCADE", 
          onDelete: "CASCADE", 
        }),
        Animalotes.belongsToMany(models.AnimalModel, {
          as: "animaisLotes", 
          foreignKey: "id_fk_animal", 
          onUpdate: "CASCADE", 
          onDelete: "CASCADE", 
        });
      })
    );
  };
} 
module.exports = Animalotes;