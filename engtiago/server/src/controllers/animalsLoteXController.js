const { animals_x_lote , animals_lote } = require("../models")
const { handleCatchedError } = require("../utils")
exports.get = async (req, res, next) => {
	try {
		const animals = await animals_x_lote.findAll()
		return res.json(animals)
	} catch (error) {
		res.status(500).json(error.message)
	}
}
exports.getByAnimalId = async (req, res, next) => {
	try {
		const { id } = req.params
		const oanimals_x_lote = await animals_x_lote.findAll({
			include: [{model: animals_lote, required: true  }],
			where: {
				fk_id_animal: id
			}
		})
		return res.json(oanimals_x_lote)
	} catch (error) {
		res.status(500).json(error.message)
	}
}
exports.post = async (req, res, next) => {
	try {
		const oanimals_x_lote = await animals_x_lote.create(req.body)
		return res.json(oanimals_x_lote)	
	} catch (error) {
		handleCatchedError(res, error.message, 400)
	}
}
exports.put = async (req, res, next) => {
	try {
		const { id } = req.params
		await animals_x_lote.update({ ...req.body }, { where: { id } })
		return res.json({ updated: true })
	} catch (error) {
		handleCatchedError(res, error.message, 400)
	}
}
exports.delete = async (req, res, next) => {
	try {
		const { id } = req.params
		const oanimals_x_lote = await animals_x_lote.findByPk(id)

		if (oanimals_x_lote) {
			oanimals_x_lote.destroy()
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