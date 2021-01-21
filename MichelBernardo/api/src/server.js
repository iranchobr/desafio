const express = require('express');
const cors = require('cors');
const server = express();
const routes = require('./routes/routes');

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(routes);

server.listen(5000, () => {
  console.log('My server is online!');
});
