var controller = require('./controllers');
var router = require('express').Router();



router.get('/qa/questions', controller.qa.getQues);

router.get('/qa/answers', controller.qa.getAns);

router.post('/qa/questions', controller.qa.addQues);






module.exports = router;
