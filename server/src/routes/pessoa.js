const express = require('express')
const router = express.Router()
const { Pessoa, Sequelize } = require('../models')
const validate = require('../validate-middleware')

/* GET /api/pessoa/
 * list all Pessoa
 * Params:
 *   - options: options object (in json) that will be used as argument to findAll method.
 */
router.get('/', async (req, res) => {
  let options = {}
  try {
    options = JSON.parse(req.query.options)
    options = typeof(options) === 'object' ? options : {}
  } catch(e) { }
  
  const pessoas = await Pessoa.findAll(options)
  res.json({
    data: pessoas
  })
})

/* GET /api/pessoa/:id
 * get specific Pessoa
 * Params:
 *   - options: options object (in json) that will be used as argument to findByPk method.
 */
router.get('/:id', async (req, res) => {
  let options = {}
  try {
    options = JSON.parse(req.query.options)
    options = typeof(options) === 'object' ? options : {}
  } catch(e) { }

  const pessoa = await Pessoa.findByPk(req.params.id, options)

  pessoa ? res.json({ data: pessoa }) : res.status(404).json({
    data: {
      "error": `none resource was found with '${req.params.id}' primary key`
    }
  })
})

/* POST /api/pessoa
 * creates new Pessoa
 */
router.post('/', validate(Pessoa.joiSchema, 'body'), (req, res) => {
  Pessoa.create(req.body).then(createdPessoa => res.json({ data: createdPessoa}))
    .catch(Sequelize.UniqueConstraintError, err => {
      const { errors } = err
      const data = {}
      errors.forEach(i => Object.assign(data, { [i.path]: i.message }))
      res.status(409).json({
        data
      })
    })
})

/* PUT /api/pessoa/:id
 * updates specific Pessoa with new data
 */
router.put('/:id', validate(Pessoa.joiSchema, 'body'), async (req, res) => {
  try {
    await Pessoa.update(req.body, { where: { id: req.params.id }})
    const pessoa = await Pessoa.findByPk(req.params.id)
    if (pessoa !== null) {
      res.json({
        data: pessoa
      })
      return
    }
  } catch(err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      const { errors } = err
      const data = {}
      errors.forEach(i => Object.assign(data, { [i.path]: i.message }))
      res.status(409).json({
        data
      })
      return
    }
  }

  res.status(404).json({
    data: {
      "error": `none resource was found with '${req.params.id}' primary key`
    }
  })
})

/* DELETE /api/pessoa/:id
 * delete specific Pessoa
 */
router.delete('/:id', async (req, res) => {
  const pessoa = await Pessoa.findByPk(req.params.id)
  if (pessoa) {
    await pessoa.destroy()
    res.json({
      data: pessoa
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

module.exports = router