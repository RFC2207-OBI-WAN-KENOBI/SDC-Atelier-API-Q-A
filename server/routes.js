var controller = require('./controllers');
var router = require('express').Router();



router.get('/qa/questions', controller.qa.getQues);

router.get('/qa/answers', controller.qa.getAns);






module.exports = router;
