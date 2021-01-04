module.exports = (sequelize, DataTypes) => {
	const animals_x_lote = sequelize.define("animals_x_lote", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		fk_id_animal:{
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "animals",
				key: "id"
			}
		},
		fk_id_lote:{
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "animals_lotes",
				key: "id"
			}
		},
		dt_entrada:{
			allowNull: false,
			type: DataTypes.DATE,
		},
		dt_saida:{
			type: DataTypes.DATE,
		},
		dt_ultima_movimentacao:{
			allowNull: false,
			type: DataTypes.DATE,
		},
		ic_bezerro:{
			type: DataTypes.INTEGER,
		},
	})

	animals_x_lote.associate = (models) => {
		animals_x_lote.belongsTo(models.animals_lote, {foreignKey: "fk_id_lote"})
	}

  
	return animals_x_lote
}