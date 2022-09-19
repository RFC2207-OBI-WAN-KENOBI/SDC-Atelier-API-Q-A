var db = require('../db').client;

module.exports = {
  getQues: function (params) {
    const query = {text: 'SELECT * FROM questions WHERE product_id = $3 LIMIT $1 OFFSET $2', values: [params[0], params[1], params[2]]}
    return db.query(query)
      .then((result) => {return result.rows})
      .catch((err) => {console.log(err)})
  },

  getAns: function(params) {
    const query = {
      text: 'SELECT * FROM answers WHERE question_id = $3 LIMIT $1 OFFSET $2',
      values: [params[0], params[1], params[2]]
    }
    return db.query(query)
      .then((result) => {return result.rows})
      .catch((err) => {console.log(err)})
  }
};