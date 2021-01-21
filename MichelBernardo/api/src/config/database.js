const { Pool } = require('pg');

const dbname = 'Iranchobr project - Vue and Nodejs Test';

const client = new Pool({
  user: 'postgres',
  password: 'defcon4',
  host: 'localhost',
  port: '5432',
  database: dbname,
});

module.exports = client;
