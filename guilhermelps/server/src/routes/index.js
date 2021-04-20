const express = require('express')

const animal = require('./animalRoute')
const animalBatch = require('./animalBatchRoute')
const batch = require('./batchRoute')
const people = require('./peopleRoute')

module.exports = app => {
  app.use(
    express.json(),
    animal,
    animalBatch,
    batch,
    people
  )
}