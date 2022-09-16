const Promise = require('bluebird');
const {Client, Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password:'1602',
  port:'3000',
  database:'QA'
});

pool.connect();
module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
      console.log('executed query', {text, duration, rows: res.rowCount});
      callback(err, res);
    })
  },
  getClient : (callback) => {
    pool.connect((err, client, done) => {
      callback(err, client, done)
    })
  }
}
// client.query('SELECT * FROM questions WHERE id = 1', (err, res) => {
//   if(err) {
//     console.log(err.stack);
//   } else {
//     console.log(res.rows[0]);
//   }
//   client.end();
// });