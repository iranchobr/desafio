const express = require('express')
const router = express.Router()
const { Lote } = require('../models')
const validate = require('../validate-middleware')

/* GET /api/lote/
 * list all Lote
 * Params:
 *   - options: options object (in json) that will be used as argument to findAll method.
 */
router.get('/', async (req, res) => {
  let options = {}
  try {
    options = JSON.parse(req.query.options)
    options = typeof(options) === 'object' ? options : {}
  } catch(e) { }
  
  const lotes = await Lote.findAll(options)
  res.json({
    data: lotes
  })
})

/* GET /api/lote/:id
 * get specific Lote
 * Params:
 *   - options: options object (in json) that will be used as argument to findByPk method.
 */
router.get('/:id', async (req, res) => {
  let options = {}
  try {
    options = JSON.parse(req.query.options)
    options = typeof(options) === 'object' ? options : {}
  } catch(e) { }

  const lote = await Lote.findByPk(req.params.id, options)

  lote ? res.json({ data: lote }) : res.status(404).json({
    data: {
      "error": `none resource was found with '${req.params.id}' primary key`
    }
  })
})

/* POST /api/lote
 * creates new Lote
 */
router.post('/', validate(Lote.joiSchema, 'body'), async (req, res) => {
  const lote = await Lote.create(req.body)
  res.json({
    data: lote
  })
})

/* PUT /api/lote/:id
 * updates specific Lote with new data
 */
router.put('/:id', validate(Lote.joiSchema, 'body'), async (req, res) => {
  await Lote.update(req.body, { where: { id: req.params.id }})
  const lote = await Lote.findByPk(req.params.id)
  if (lote !== null) {
    res.json({
      data: lote
    })
  } else {
    res.status(404).json({
      data: {
        "error": `none resource was found with '${req.params.id}' primary key`
      }
    })
  }
})

/* DELETE /api/lote/:id
 * delete specific Lote
 */
router.delete('/:id', async (req, res) => {
  const lote = await Lote.findByPk(req.params.id)
  if (lote) {
    await lote.destroy()
    res.json({
      data: lote
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