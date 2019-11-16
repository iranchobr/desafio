const Joi = require('joi')

const validate = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property])

    if (error === null) {
      next()
    } else {
      const { details } = error
      const data = {}
      details.forEach(i => {
        let buildedPath = i.path[0]
        for (let j = 1; j < i.path.length; j++)
          buildedPath += typeof(i.path[j]) === 'number' ? `[${i.path[j]}]` : `.${i.path[j]}`
        Object.assign(data, { [buildedPath]: i.message })
      })
      res.status(422)
        .json({
          data
        })
    }
  }
}

module.exports = validate