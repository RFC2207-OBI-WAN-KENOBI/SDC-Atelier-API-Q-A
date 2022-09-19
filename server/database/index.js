const {Client, Pool} = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password:'1602',
  port:'3000',
  database:'QA'
})

client.connect();

module.exports.client = client;


