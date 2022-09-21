var models = require('../models');



module.exports = {
  getQues: function(req, res) {
    var params = [req.query.count, (req.query.page * req.query.count).toString(), req.query.product_id];
    return models.qa.getQues(params)
    .then((data) => {res.send(data)})
    .catch((err) => {console.log(err)})
  },

  getAns: function(req, res) {
    var params = [req.query.count, (req.query.page * req.query.count).toString(), req.query.question_id];
    return models.qa.getAns(params)
      .then((data) => {res.send(data)})
      .catch((err) => {console.log(err)})
  },

  addQues: function(req, res) {
    var params = [req.query.body, req.query.name, req.query.email, req.query.product_id];
    return models.qa.addQues(params)
      .then(() => {res.status(201).end()})
      .catch((err) => console.log(err))
  }
};