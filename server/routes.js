const db = require('./databse/index.js');
const express = require('express');
const app = express();


app.get('/qa/questions', (req, res, next) => {
  db.query('SELECT * FROM questions WHERE id = 4', [req.params.id], (err, result) => {
    if(err){
      return next(err)
    }
    res.send(result.rows[0])
  })
})

