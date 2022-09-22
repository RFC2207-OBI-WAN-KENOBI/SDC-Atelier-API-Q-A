const {Client, Pool} = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
  database: process.env.DATABASE
})

client.connect();

module.exports.client = client;


