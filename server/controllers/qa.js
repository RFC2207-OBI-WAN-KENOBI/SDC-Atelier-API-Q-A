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
    var params = [req.body.params.body, req.body.params.name, req.body.params.email, req.body.params.product_id];
    return models.qa.addQues(params)
      .then(() => {res.status(201).end()})
      .catch((err) => console.log(err))
  },

  addAns: function(req, res) {
    var params = [req.body.params.body, req.body.params.name, req.body.params.email, req.body.params.question_id];
    return models.qa.addAns(params)
      .then(() => {res.status(201).end()})
      .catch((err) => console.log(err))
  },

  qHelp: function(req, res) {
    var params = [req.body.params.question_id];
    return models.qa.qHelp(params)
      .then(() => {res.status(200).end()})
      .catch((err) => console.log(err))
  },

  qReport: function(req, res) {
    var params = [req.body.params.question_id];
    return models.qa.qReport(params)
      .then(() => {res.status(200).end()})
      .catch((err) => console.log(err))
  },

  aHelp: function(req, res) {
    var params = [req.body.params.answer_id];
    return models.qa.aHelp(params)
      .then(() => {res.status(200).end()})
      .catch((err) => console.log(err))
  },

  aReport: function(req, res) {
    var params = [req.body.params.answer_id];
    return models.qa.aReport(params)
      .then(() => {res.status(200).end()})
      .catch((err) => console.log(err))
  }
};