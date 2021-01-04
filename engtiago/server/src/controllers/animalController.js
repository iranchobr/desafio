const { animal } = require("../models")
const { handleCatchedError } = require("../utils")
exports.get = async (req, res, next) => {
	try {
		const animals = await animal.findAll()
		return res.json(animals)
	} catch (error) {
		res.status(500).json(error.message)
	}
}
exports.post = async (req, res, next) => {
	try {
		const oAnimal = await animal.create(req.body)
		return res.json(oAnimal)	
	} catch (error) {
		handleCatchedError(res, error.message, 400)
	}
}
exports.put = async (req, res, next) => {
	try {
		const { id } = req.params
		await animal.update({ ...req.body }, { where: { id } })
		return res.json({ updated: true })
	} catch (error) {
		handleCatchedError(res, error.message, 400)
	}
}
exports.delete = async (req, res, next) => {
	try {
		const { id } = req.params
		const oAnimal = await animal.findByPk(id)

		if (oAnimal) {
			oAnimal.destroy()
			return res.json({ deleted: true })
		}

		return res.status(400).json({
			deleted: false,
			message: "Entidade não encontrada."
		})

	} catch (error) {
		handleCatchedError(res, error.message)
	}
}