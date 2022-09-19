var db = require('./database/index.js');
require('dotenv').config();
var express = require('express');
var app = express();

//middleware
var morgan = require('morgan');
var cors = require('cors');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

var router = require('./routes.js');
app.use(express.static('./public'));
app.use('/qa', router);

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server listening at port http://localhost:${PORT}`);


module.exports.app = app;