const express = require('express')
const router = express.Router()
const pessoa = require('./pessoa')
const animal = require('./animal')
const lote = require('./lote')

router.use('/pessoa', pessoa)
router.use('/animal', animal)
router.use('/lote', lote)

module.exports = router