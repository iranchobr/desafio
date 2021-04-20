const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const validators = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    let validatorName = file.split('.')[0];
    const validator = require(path.join(__dirname, file));
    validators[validatorName] = validator;
  });

module.exports = validators;