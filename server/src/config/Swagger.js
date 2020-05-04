const swaggerJSDoc = require('swagger-jsdoc');

// swagger definition
var swaggerDefinition = {
    info: {
        title: 'Changelle irancho API',
        version: '1.0.0',
        description: 'Api changelle irancho',
    },
    host: `localhost:${process.env.PORT}`,
    basePath: '/',
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: swaggerDefinition,
    apis: ['./src/routes/*.js'],
});


module.exports = swaggerSpec;

