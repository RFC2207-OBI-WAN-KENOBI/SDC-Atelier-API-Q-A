const Promise = require('bluebird');
const {Client, Pool} = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password:'1602',
  port:'3000',
  database:'QA'
});

client.connect();
client.query('SELECT 100 from questions', (err, res) => {
  if(err) {
    console.log(err.message);
  } else {
    console.log(res.rows)
  }
  client.end
});