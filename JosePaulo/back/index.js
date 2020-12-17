const express = require('express');
const cors = require('cors');
const app = express();
const bp = require('body-parser');
const router = require("./router/router");

app.use(cors());
app.use(express.json());
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
app.use(router);
app.use('/', router)
app.listen(3002);
module.exports = app;
