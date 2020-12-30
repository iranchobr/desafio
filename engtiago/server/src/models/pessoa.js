module.exports = (sequelize, DataTypes) => {
	const pessoa = sequelize.define("pessoa", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		no_pessoa:{
			type: DataTypes.STRING,
			allowNull: false,
		},
		no_email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		endereco:{
			type: DataTypes.STRING,
			allowNull: false,
		},
		sexo:{
			type: DataTypes.STRING(1),
			allowNull: false,
			validate: {
				isIn: [["M", "F"]],   
			}
		},
		ic_ativo:{
			type: DataTypes.BOOLEAN,
		},
	})
  
	return pessoa
}