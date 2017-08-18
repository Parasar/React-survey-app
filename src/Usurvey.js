import React, {Component} from 'react';
var firebase = require('firebase');
// import * as firebase from 'firebase';
var uuid = require('uuid');

var config = {
    apiKey: "AIzaSyBfrcF3Enrr2sVIuqtJKigs85EsqKaO44k",
    authDomain: "usurvey-c797e.firebaseapp",
    databaseURL: "https://usurvey-c797e.firebaseio.com",
    projectId: "usurvey-c797e",
    storageBucket: "usurvey-c797e.appspot.com",
    messagingSenderId: "208446978572"
  };
firebase.initializeApp(config);

class Usurvey extends Component {

  constructor(props){
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers: {
        ans1: '',
        ans2: '',
        ans3: ''
      },
      isSubmitted: false
    };

    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.answerSubmitted = this.answerSubmitted.bind(this);
  }

  nameSubmit(e){
    // e.preventDefault();
    var name = this.refs.name.value;
    this.setState({studentName: name},()=>{
      console.log(name);
      console.log(this.state);
    });

  }

  answerSelected(e){
    var ans = this.state.answers;
    if (e.target.name ==='answer1') {
      ans.ans1 = e.target.value;
    } else if (e.target.name ==='answer2') {
      ans.ans2 = e.target.value;
    } else if (e.target.name ==='answer3') {
      ans.ans3 = e.target.value;
    }
    this.setState({answers: ans}, function(){
      console.log(this.state);
    });
  }

  answerSubmitted(e){
    e.preventDefault();
    this.setState({isSubmitted : true});
    // Set value to database
    firebase.database().ref('uSurvey/' + this.state.uid).set({
      studentName : this.state.studentName,
      answers : this.state.answers
    });
  }

  render(){


    var studentName, questions, thanks;

    questions =
    <div>
      <h2>Questions</h2>


      <form onSubmit={this.answerSubmitted}>
        <div className="card">
          <label><b>What kind of courses do you like {this.state.studentName} ? </b></label>
          <br />
          <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected}/> Technology
          <input type="radio" name="answer1" value="Design" onChange={this.answerSelected}/> Design
          <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected}/> Marketing
        </div>

        <div className="card">
          <label><b>You are a: </b></label>
          <br />
          <input type="radio" name="answer2" value="Student" onChange={this.answerSelected}/> Student
          <input type="radio" name="answer2" value="In-job" onChange={this.answerSelected}/> In a job
          <input type="radio" name="answer2" value="Looking" onChange={this.answerSelected}/> Looking for a job
        </div>

        <div className="card">
          <label><b>Is online learnign helpful? </b></label>
          <br />
          <input type="radio" name="answer3" value="Yes" onChange={this.answerSelected}/> Yes
          <input type="radio" name="answer3" value="No" onChange={this.answerSelected}/> No
          <input type="radio" name="answer3" value="Maybe" onChange={this.answerSelected}/> Maybe
        </div>

        <input type="submit" className="feedback-button" value="submit" onSubmit={this.answerSubmitted}/>
      </form>

    </div>;

    if (this.state.studentName === '' && this.state.isSubmitted === false) {
      studentName =
      <div>
        <h2>What's your name?</h2>
        <form onSubmit={this.nameSubmit}>
          <input className='namy' type='text' ref='name' />
          </form>
      </div>;
      questions = '';
    }
    else if (this.state.studentName !=='' && this.state.isSubmitted === false) {
      studentName =
      <div>
        <h2> Hey there {this.state.studentName}. Welcome to U survey!</h2>
      </div>;
    }
    else if (this.state.answers !==  undefined && this.state.isSubmitted === true) {
      thanks =
      <div>
        <h1>Thanks for answersing</h1>
      </div>;
      questions = '';
    }





    return(
      <div>
        {studentName}
        {thanks}
        __

        {questions}



      </div>
    );
  }
}

export default Usurvey;
