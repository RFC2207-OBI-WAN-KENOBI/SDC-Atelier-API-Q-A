var db = require('../db').client;

module.exports = {
  getAll: function (params) {
    const query = {text: 'SELECT * FROM questions LIMIT $1 OFFSET $2', values: [params[0], params[1]]}
    return db.query(query)
      .then((result) => {return result.rows})
      .catch((err) => {console.log(err)})
  }
};