const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const services = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    let serviceName = file.split('.')[0];
    const service = require(path.join(__dirname, file));
    services[serviceName] = service;
  });

module.exports = services;