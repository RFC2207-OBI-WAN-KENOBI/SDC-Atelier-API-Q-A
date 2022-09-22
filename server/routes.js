var controller = require('./controllers');
var router = require('express').Router();


//GET Request
router.get('/qa/questions', controller.qa.getQues);

router.get('/qa/answers', controller.qa.getAns);

//POST Request
router.post('/qa/questions', controller.qa.addQues);

router.post('/qa/answers', controller.qa.addAns);

//PUT Request
router.put('/qa/questions/helpful', controller.qa.qHelp);

router.put('/qa/questions/report', controller.qa.qReport);

router.put('/qa/answers/helpful', controller.qa.aHelp);

router.put('/qa/answers/report', controller.qa.aReport);


module.exports = router;
