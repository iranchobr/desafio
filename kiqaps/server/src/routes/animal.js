const express = require('express')
const router = express.Router()
const { Animal, Pessoa, AnimalLote, Lote, sequelize } = require('../models')
const validate = require('../validate-middleware')

const getPessoaId = async ({ fk_id_pessoa: id }) => {
  let _id = parseInt(id)
  let pessoa = null

  if (isNaN(_id)) {
    pessoa = await Pessoa.findOne({
      where: {
        no_email: id
      }
    })
  } else {
    pessoa = await Pessoa.findByPk(_id)
  }

  if (pessoa === null)
    return null

  _id = pessoa.id
  return _id
}

/* GET /api/animal/
 * list all Animal
 * Params:
 *   - options: options object (in json) that will be used as argument to findAll method.
 */
router.get('/', async (req, res) => {
  let options = {}
  try {
    options = JSON.parse(req.query.options)
    options = typeof(options) === 'object' ? options : {}
  } catch(e) { }
  
  const animais = await Animal.findAll(options)
  res.json({
    data: animais
  })
})

/* GET /api/animal/:id
 * get specific Animal
 * Params:
 *   - options: options object (in json) that will be used as argument to findByPk method.
 */
router.get('/:id', async (req, res) => {
  let options = {}
  try {
    options = JSON.parse(req.query.options)
    options = typeof(options) === 'object' ? options : {}
  } catch(e) { }

  const animal = await Animal.findByPk(req.params.id, options)

  animal ? res.json({ data: animal }) : res.status(404).json({
    data: {
      "error": `none resource was found with '${req.params.id}' primary key`
    }
  })
})

/* POST /api/animal
 * creates new Animal
 */
router.post('/', validate(Animal.joiSchema(), 'body'), async (req, res) => {
  const fk_id_pessoa = await getPessoaId(req.body)
  if (fk_id_pessoa === null) {
    return res.status(422).json({
      data: "a valid \"fk_id_pessoa\" is required"
    })
  }
  Object.assign(req.body, { fk_id_pessoa })

  const animal = await Animal.create(req.body)
  res.json({
    data: animal
  })
})

/* PUT /api/animal/:id
 * updates specific Animal with new data
 */
router.put('/:id', validate(Animal.joiSchema(true), 'body'), async (req, res) => {
  await Animal.update(req.body, { where: { id: req.params.id }})
  const animal = await Animal.findByPk(req.params.id)

  if (animal !== null)
    res.json({ data: animal })
  else
    res.status(404).json({
      data: {
        "error": `none resource was found with '${req.params.id}' primary key`
      }
    })
})

/* DELETE /api/animal/:id
 * delete specific Animal
 */
router.delete('/:id', async (req, res) => {
  const animal = await Animal.findByPk(req.params.id)
  if (animal) {
    await animal.destroy()
    res.json({
      data: animal
    })
  }
  else {
    res.status(404).json({
      data: {
        "error": `none resource was found with '${req.params.id}' primary key`
      }
    })
  }
})

/* POST /api/animal/:id/lote
 * creates a new Animal-Lote relationship
 */
router.post('/:id/lote', validate(AnimalLote.joiSchema(), 'body'), async (req, res) => {
  let animal = await Animal.findByPk(req.params.id)
  if (animal === null) {
    return res.status(404).json({
      error: `none Animal was found with '${req.params.id}' primary key`
    })
  }

  const lote = await Lote.findByPk(req.body.fk_id_lote)
  if (lote === null) {
    return res.status(404).json({
      error: `none Lote was found with '${req.params.fk_id_lote}' primary key`
    })
  }
  Object.assign(req.body, { fk_id_animal: req.params.id })
  await AnimalLote.create(req.body)

  animal = await Animal.findByPk(req.params.id, { include: [ 'lotes' ] })
  res.json({
    data: animal
  })
})

/* PUT /api/animal/:id_animal/lote/:id_lote
 * updates an existing Animal-Lote relationship
 */
router.put('/:id_animal/lote/:id_lote', validate(AnimalLote.joiSchema(true), 'body'), async (req, res) => {
  let animal_lote = await AnimalLote.findOne({ where: {
    fk_id_animal: req.params.id_animal,
    fk_id_lote: req.params.id_lote,
  }})

  if (animal_lote === null)
    return res.status(404).json({
      error: `there's no relationship between Animal(${id_animal}) and Lote(${id_lote})`
    })

  animal_lote = await animal_lote.update(req.body)

  const animal = await Animal.findByPk(req.params.id_animal, { include: [ 'lotes' ] })
  res.json({
    data: animal
  })
})

/* DELETE /api/animal/:id_animal/lote/:id_lote
 * deletes an existing Animal-Lote relationship
 */
router.delete('/:id_animal/lote/:id_lote', async (req, res) => {
  let animal_lote = await AnimalLote.findOne({ where: {
    fk_id_animal: req.params.id_animal,
    fk_id_lote: req.params.id_lote,
  }})

  if (animal_lote === null)
    return res.status(404).json({
      error: `there's no relationship between Animal(${id_animal}) and Lote(${id_lote})`
    })

  await animal_lote.destroy()

  const animal = await Animal.findByPk(req.params.id_animal, { include: [ 'lotes' ] })
  res.json({
    data: animal
  })
})

module.exports = router