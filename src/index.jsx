const axios = require('axios');
import React from 'react';
import { API_KEY } from './config/config.js';
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById("root"));


class App extends React.Component {
  constructor(props) {
    super (props)
    this.state = {}
  }

  componentDidMount() {
    var tempID = Math.floor(Math.random() * (1000000 - 1) + 1);
    axios.get('/qa/questions', {
      headers: {'Authorization': `${API_KEY}`},
      params: {
        count: 5,
        page: 0,
        product_id: tempID
      }})
      .then((res) => {console.log(res)})
      .catch((err) => console.log(err))

      axios.get('/qa/answers', {
        headers: {'Authorization': `${API_KEY}`},
        params: {
          count: 5,
          page: 0,
          question_id: tempID
        }})
        .then((res) => {console.log(res)})
        .catch((err) => console.log(err));

      // axios.post('/qa/questions', {
      //   headers: {'Authorization': `${API_KEY}`},
      //   params: {
      //     body: 'This is a test?',
      //     name: 'Testing12',
      //     email: 'Testing@email.com',
      //     product_id: tempID
      //   }})
      //   .then((res) => {console.log(res)})
      //   .catch((err) => console.log(err));

      // axios.post('/qa/answers', {
      //   headers: {'Authorization': `${API_KEY}`},
      //   params: {
      //     body: 'this test is a lie',
      //     name: 'Testing12',
      //     email: 'Testing@email.com',
      //     question_id: tempID
      //   }})
      //   .then((res) => {console.log(res)})
      //   .catch((err) => console.log(err));

      // axios.put('/qa/questions/helpful', {
      //   headers: {'Authorization': `${API_KEY}`},
      //   params: {
      //     question_id: tempID
      //   }})
      //   .then((res) => {console.log(res)})
      //   .catch((err) => console.log(err));

      // axios.put('/qa/questions/report', {
      //   headers: {'Authorization': `${API_KEY}`},
      //   params: {
      //     question_id: tempID
      //   }})
      //   .then((res) => {console.log(res)})
      //   .catch((err) => console.log(err));

      // axios.put('/qa/answers/helpful', {
      //   headers: {'Authorization': `${API_KEY}`},
      //   params: {
      //     answer_id: tempID
      //   }})
      //   .then((res) => {console.log(res)})
      //   .catch((err) => console.log(err));

      // axios.put('/qa/answers/report', {
      //   headers: {'Authorization': `${API_KEY}`},
      //   params: {
      //     answer_id: tempID
      //   }})
      //   .then((res) => {console.log(res)})
      //   .catch((err) => console.log(err));

      }









  render () {
    return (
      <div>
        SDC Obi-Wan QA
      </div>
    )
  }
}


root.render(<App />);