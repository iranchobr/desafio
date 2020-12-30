"use strict"
module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable("pessoas", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			no_pessoa:{
				type: Sequelize.STRING,
				allowNull: false,
			},
			no_email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			endereco:{
				type: Sequelize.STRING,
				allowNull: false,
			},
			sexo:{
				type: Sequelize.STRING(1),
				allowNull: false,
			},
			ic_ativo:{
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})

	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("pessoas")
	}

}

