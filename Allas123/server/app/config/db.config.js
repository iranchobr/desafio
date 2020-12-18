const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('desafio_i_rancho', 'root', '123456', {
    host: 'localhost',
    dialect:  'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('The connection was created successfully.');
    })
    .catch((error) => {
        console.error('Could not connect to the database:', error);
    });


module.exports = sequelize;
