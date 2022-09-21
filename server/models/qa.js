var db = require('../db').client;

module.exports = {
  getQues: function (params) {
    const query = {
      text: 'SELECT questions.product_id, questions.question_id, questions.question_body, questions.question_date, questions.asker_name, questions.question_helpful, questions.reported, answers.answer_id AS answer_id, answers.answer_body, answers.date_written, answers.answerer_name, answers.helpful FROM questions LEFT OUTER JOIN answers ON questions.question_id = answers.question_id WHERE questions.product_id = $3 ORDER BY questions.question_helpful DESC LIMIT $1 OFFSET $2',
      values: [params[0], params[1], params[2]]}
    let temp;
    return db.query(query)
    .then((result) => {
      let data = {product_id: params[2]};
      let res = result.rows;
      let resultArr = [];
      let resultObj = {};

      for(var row of res) {
        if(resultObj[row.question_id]) {
          let ans = row.answer_id ? {} : null;
          if(ans) {
            ans = {
              id: row.answer_id,
              body: row.answer_body,
              date: row.date_written,
              answerer_name: row.answerer_name,
              helpfulness: row.helpful,
            };
            resultObj[row.question_id].answers[ans.id] = ans;
          }
        } else {
          resultObj[row.question_id] = {
            question_id: row.question_id,
            question_body: row.question_body,
            asker_name: row.asker_name,
            question_helpfulness: row.question_helpful,
            reported: row.reported,
            answers: {}
          }
        let ans = row.answer_id ? {} : null;
        if(ans) {
          ans = {
            id: row.answer_id,
            body: row.answer_body,
            date: row.date_written,
            answerer_name: row.answerer_name,
            helpfulness: row.helpful,
          };
          resultObj[row.question_id].answers[ans.id] = ans;
        }
      }
    }
    let ques = Object.values(resultObj);
    ques.forEach((question) => {resultArr.push(question)})
    data.results = resultArr;
    return data;
  })
    .catch((err) => console.log(err))

    // return db.query(query)
    //   .then((result) => {return result.rows})
    //   .catch((err) => {console.log(err)})
  },

  getAns: function(params) {
    const query = {
      text: 'SELECT * FROM answers WHERE question_id = $3 ORDER BY helpful DESC LIMIT $1 OFFSET $2',
      values: [params[0], params[1], params[2]]
    }
    return db.query(query)
      .then((result) => {return result.rows})
      .catch((err) => {console.log(err)})
  },

  addQues: function(params) {
    var date = new Date().getTime();
    const query = {
      text: 'INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email, question_helpful, reported) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      values: [params[3], params[0], date, params[1], params[2], 0, false]
    }
    return db.query(query)
      .then(() => {console.log('Post was completed')})
      .catch((err) => {console.log(err)})
  },

  addAns: function(params) {
    var date = new Date().getTime();
    const query = {
      text: '',
      values: []
    }
    return db.query(query)
      .then((result) => {return result.rows})
      .catch((err) => {console.log(err)})
  },

  qHelp: function(params) {
    const query = {
      text: '',
      values: []
    }
    return db.query(query)
      .then((result) => {return result.rows})
      .catch((err) => {console.log(err)})
  },

  aHelp: function(params) {
    const query = {
      text: '',
      values: []
    }
    return db.query(query)
      .then((result) => {return result.rows})
      .catch((err) => {console.log(err)})
  },

  qReport: function(params) {
    const query = {
      text: '',
      values: []
    }
    return db.query(query)
      .then((result) => {return result.rows})
      .catch((err) => {console.log(err)})
  },

  aReport: function(params) {
    const query = {
      text: '',
      values: []
    }
    return db.query(query)
      .then((result) => {return result.rows})
      .catch((err) => {console.log(err)})
  },
};