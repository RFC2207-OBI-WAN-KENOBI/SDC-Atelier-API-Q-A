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
    var tempID = Math.floor(Math.random() * (10000 - 1) + 1);
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