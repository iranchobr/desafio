module.exports = (sequelize, DataTypes) => {
	const animals_lote = sequelize.define("animals_lote", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		no_lote:{
			type: DataTypes.STRING,
			allowNull: false,
		},
		ds_lote:{
			type: DataTypes.STRING,
		},
	})
  

	animals_lote.associate = (models) => {
		animals_lote.hasMany(models.animals_x_lote, {foreignKey: "fk_id_lote"})
	}

	return animals_lote
}