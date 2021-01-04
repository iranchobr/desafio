const { pessoa } = require("../models")
const { handleCatchedError } = require("../utils")
exports.get = async (req, res, next) => {
	try {
		const pessoas = await pessoa.findAll()
		console.log(pessoas)
		return res.json(pessoas)
	} catch (error) {
		res.status(500).json(error.message)
	}
}
exports.post = async (req, res, next) => {
	try {
		const aPessoa = await pessoa.create(req.body)
		return res.json(aPessoa)	
	} catch (error) {
		handleCatchedError(res, error.message, 400)
	}
}
exports.put = async (req, res, next) => {
	try {
		const { id } = req.params
		await pessoa.update({ ...req.body }, { where: { id } })
		return res.json({ updated: true })
	} catch (error) {
		handleCatchedError(res, error.message, 400)
	}
}
exports.delete = async (req, res, next) => {
	try {
		const { id } = req.params
		const aPessoa = await pessoa.findByPk(id)

		if (aPessoa) {
			aPessoa.destroy()
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