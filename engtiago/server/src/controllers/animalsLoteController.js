const { animals_lote } = require("../models")
const { handleCatchedError } = require("../utils")
exports.get = async (req, res, next) => {
	try {
		const animals = await animals_lote.findAll()
		return res.json(animals)
	} catch (error) {
		res.status(500).json(error.message)
	}
}
exports.post = async (req, res, next) => {
	try {
		const oAnimals_lote = await animals_lote.create(req.body)
		return res.json(oAnimals_lote)	
	} catch (error) {
		handleCatchedError(res, error.message, 400)
	}
}
exports.put = async (req, res, next) => {
	try {
		const { id } = req.params
		await animals_lote.update({ ...req.body }, { where: { id } })
		return res.json({ updated: true })
	} catch (error) {
		handleCatchedError(res, error.message, 400)
	}
}
exports.delete = async (req, res, next) => {
	try {
		const { id } = req.params
		const oAnimals_lote = await animals_lote.findByPk(id)

		if (oAnimals_lote) {
			oAnimals_lote.destroy()
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