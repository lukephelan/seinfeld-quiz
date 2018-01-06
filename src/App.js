import React, { Component } from 'react';
import logo from './images/seinfeld-logo.png';
import update from 'react-addons-update';
import Quiz from './components/Quiz';
import quizQuestions from './api/quizQuestions';
import Result from './components/Result';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        Correct: 0,
        Incorrect: 0
      },
      result: '',
      resultDescription: ''
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleRestartQuiz = this.handleRestartQuiz.bind(this);
  }

  componentWillMount() {
    this.shuffleQuestions();
  }

  shuffleQuestions() {
    const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));

    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remains elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: { $apply: (currentValue) => currentValue + 1 }
    });
    this.setState({
      answersCount: updatedAnswersCount,
      answer: answer
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setResultDescription();
      this.setState({ result: 'Complete' });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  setResultDescription() {
    const accuracy = this.state.answersCount.Correct / quizQuestions.length;
    var resultDescription = '';
    if (accuracy <= 0.5) {
      resultDescription = 'I really cannot comprehend how stupid people can be sometimes. Can you comprehend it? I mean, we can put a man on the moon but we\'re still basically very stupid.';
    } else if (accuracy <= 0.75) {
      resultDescription = 'That\'s pretty average.';
    } else {
      resultDescription = 'You magnificent bastard!';
    }
    this.setState({ resultDescription: resultDescription });
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result 
        quizResult={this.state.answersCount.Correct} 
        questionTotal={quizQuestions.length}
        resultDescription={this.state.resultDescription}
        handleRestartQuiz={this.handleRestartQuiz} />
    );
  }

  handleRestartQuiz() {
    this.setState({
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        Correct: 0,
        Incorrect: 0
      },
      result: '',
      resultDescription: ''
    });
    this.shuffleQuestions();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="App-title">Seinfeld Quiz</h2>
        </header>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default App;
