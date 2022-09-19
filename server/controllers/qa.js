var models = require('../models');



module.exports = {
  get: function(req, res) {
    var params = [req.query.count, (req.query.page * req.query.count).toString()];
    return models.products.getAll(params)
    .then((data) => {res.send(data)})
    .catch((err) => {console.log(err)})
  };
}