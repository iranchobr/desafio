"use strict"
module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable("animals_lotes", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			no_lote:{
				type: Sequelize.STRING,
				allowNull: false,
			},
			ds_lote:{
				type: Sequelize.STRING,
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
		await queryInterface.dropTable("animals_lotes")
	}
}
