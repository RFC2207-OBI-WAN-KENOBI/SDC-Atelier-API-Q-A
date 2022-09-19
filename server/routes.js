var controller = require('./controllers');
var router = require('express').Router();



router.get('questions', controller.qa.get);


// app.get('/qa/questions', (req, res, next) => {
//   db.query('SELECT * FROM questions WHERE id = 4', params, (err, result) => {
//     if(err){
//       return next(err)
//     }
//     res.send(result.rows[0])
//   })
// })

