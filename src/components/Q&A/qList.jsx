import React from "react";
import AnswerComp from "./AnswerComp.jsx"
import QuestionComp from "./QuestionComp.jsx"
import AddQuestion from "./AddQuestion.jsx"
import {API_KEY} from '../../config/config.js';
const axios = require('axios');

class QList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productQ: {},
      page: 1,
      count: 5,
      questionArr: [],
      searchSort: false,
      searchArray: [],
      totalQuesArr: [],
      btnClick: false,
      addClick: false,
      show: false,
      currentID: '',
      sort: false
    }

    this.sortQuestions = this.sortQuestions.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSeeLessQues = this.handleSeeLessQues.bind(this);
    this.handleSeeMoreQues = this.handleSeeMoreQues.bind(this);
    this.handleAddQues = this.handleAddQues.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  sortQuestions() {
      var qArr = this.state.productQ.results;
      if (qArr.length > 1) {
        // for (var i = 0; i < qArr.length; i++) {
        //   if(qArr[i-1]) {
        //     if(qArr[i].question_helpfulness > qArr[0].question_helpfulness) {
        //       var temp = qArr[i];
        //       qArr[i] = qArr[i-1];
        //       qArr[i-1] = temp;
        //     }
        //   }
        // }
        qArr.sort((a, b) => {
          return b.question_helpfulness - a.question_helpfulness;
        });
        this.setState({totalQuesArr: qArr});
        var temp = qArr.slice(0,2);
        this.setState({questionArr: temp});
      }
      this.setState({totalQuesArr: qArr});
      var tempArr = qArr.slice(0,2);
      this.setState({questionArr: tempArr});
  }

  handleSearch(e) {
    var term = e.target.value;
    term = term.toLowerCase();
    var searchArr = this.state.totalQuesArr;
    if (term.length >= 3) {
      this.setState({searchSort: true});
      for(var i = 0; i < searchArr.length; i++) {
        if (searchArr[i - 1]) {
          var currentStr = searchArr[i].question_body;
          if (currentStr.includes(term)) {
            var matchedQuestion = searchArr[i];
            searchArr[i] = searchArr[0];
            searchArr[0] = matchedQuestion;
          }
        }
      }
      this.setState({totalQuesArr: searchArr});
      var slicedSearch = searchArr.slice(0,2); //make changes here when using live data
      this.setState({searchArray: slicedSearch});
    } else {
      this.setState({searchSort: false});
      this.sortQuestions();
    }
  }

  handleSeeMoreQues(totalArr) {
    if(this.state.searchSort) {
      this.setState({btnClick: true}); //on each button click should add 2 more questions to arr
      this.setState({searchArray: totalArr}); //TODO: once working with live data make changes here
    } else {
      this.setState({btnClick: true});
      this.setState({questionArr: totalArr});
    }
  }

  handleSeeLessQues(totalArr) {
    if(this.state.searchSort) {
      this.setState({btnClick: false});
      var temp = totalArr.slice(0, 2);
      this.setState({searchArray: temp});
    } else {
      this.setState({btnClick: false});
      var tempArr = totalArr.slice(0, 2);
      this.setState({questionArr: tempArr});
    }
  }

  handleAddQues() {
    this.setState({addClick: true});
  }

  handleClose(e) {
    e.preventDefault();
    this.setState({show: false})
  }
//use componentDidUpdate with a conditional statement
  componentDidUpdate(prevProps) {
    if(this.props.product.id !== prevProps.product.id) {
      axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/qa/questions',
      {headers: {'Authorization': `${API_KEY}`},
      params: {count: 5, page: 1, product_id: this.props.product.id}})
        .then((res) => this.setState({productQ: res.data, currentID: this.props.product.id}))
        .catch((err) => console.log(err));
    }
  }




  render() {
    if (this.state.productQ.results !== undefined && this.state.sort === false) {
      this.sortQuestions();
      this.setState({sort: true});
    }
    // let addQuestion;
    // if (this.state.addClick) {
    //   addQuestion = <AddQuestion />
    // } else {
    //   addQuestion = <span></span>
    // }




    let moreQBtn;
    if (this.state.totalQuesArr.length > 2) {
      moreQBtn = <button onClick={(e) => this.handleSeeMoreQues(this.state.totalQuesArr)}>See More Questions</button>
    } else {
      moreQBtn = <span></span>
    }
    if (this.state.btnClick) {
      moreQBtn = <button onClick={(e) => this.handleSeeLessQues(this.state.totalQuesArr)}>See Less Questions</button>
    }




    let toRender;
    var index = 1;
    if (this.state.searchSort) {
      toRender =
      this.state.searchArray.map((qItem) =>
        <ul>
          <span>{index++}</span>
          <QuestionComp questionList={qItem} proID={this.state.productQ.product_id}/>
          <AnswerComp answerList={qItem.answers}/>
        </ul>
        );
    } else {
      toRender =
      this.state.questionArr.map((qItem) =>
        <ul>
          <QuestionComp questionList={qItem} proID={this.state.productQ.product_id}/>
          <AnswerComp answerList={qItem.answers}/>
        </ul>
        );
    }



    return(
      <div id="q-list">
        <h1 id="q-a-title">Questions and Answers</h1>
        <form>
          <h1>Search: </h1>
          <input type='text' placeholder='Have a question? Search for answers...' onChange={this.handleSearch}></input>
        </form>
        {toRender}
        {moreQBtn}
        <button onClick={(e) => this.setState({show: true})}>Add a Question</button>
        <AddQuestion onClose={(e) => this.handleClose(e)} show={this.state.show} currentProductID={this.state.productQ.product_id} currentProduct={this.props.product.name}/>
      </div>


    )
  }

}

export default QList;
