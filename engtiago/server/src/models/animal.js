module.exports = (sequelize, DataTypes) => {
	const animal = sequelize.define("animal", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		fk_id_pessoa:{
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "pessoas",
				key: "id"
			}
		},
		id_fazenda:{
			type: DataTypes.INTEGER,
			allowNull:false,
		},
		no_animal:{
			type: DataTypes.STRING,
			allowNull:false,
		},
		no_raca:{
			type: DataTypes.STRING,
			allowNull:false,
		},
		sexo:{
			type: DataTypes.STRING(1),
			allowNull:false,
			validate: {
				isIn: [["M", "F"]],   
			}
		},
		vr_peso:{
			type: DataTypes.DOUBLE,
			allowNull:false,
		},
		dt_nascimento:{
			type:DataTypes.DATEONLY,
			allowNull: false,
		},
	})
  
	return animal
}