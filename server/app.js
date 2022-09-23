var db = require('./db/index.js');
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
app.use(router);

const PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log(`Server listening at port http://${process.env.HOST}:${PORT}`);

// process.on('unhandledRejection', (r, p) => {
//   console.log('Unhandled Rejection at:', p, 'reason:', r);
//   p.catch((err) => console.log(err));
// });
// process.on('uncaughtException', function (err) {
//   console.log(err);
// });


module.exports.app = app;