const express = require('express');
const routes = require('./routes');
const cors = require('cors')

const app = express();

app.use(cors());

routes(app);

app.listen(3000, () => console.log('server runnning on port 3000.'));

module.exports = app;