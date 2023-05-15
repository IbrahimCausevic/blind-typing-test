import React from "react";
import logo from "./logo.svg";
import "./App.css";

const mockList = ["Buy fruits", "read a book", "Take a shower"];

class App extends React.Component {
  state = {
    myText: "",
    textList: [],
    text: "",
    likes: null,
  };

  componentDidMount() {
    this.getRandomQuote();
  }

  getRandomQuote = () => {
    fetch("https://js-course-server.onrender.com/quotes/get-random-quote")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          text: data.quoteText,
          myText: "",
          textList: [],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addNewTask = (event) => {
    event.preventDefault();
    const newToDoList = [...this.state.textList];
    newToDoList.push(this.state.myText);
    this.setState({ myText: "", textList: newToDoList });
  };

  clearAllTasks = () => {
    this.setState({ myText: "", textList: [] });
  };

  render() {
    return (
      <div className="vertical-flex">
        <div className="container">
          <div>
            <div className="title">
              <h2>Blind typing test</h2>
              <p>{this.state.text}</p>
            </div>
            <div className="form">
              <form onSubmit={this.addNewTask}>
                <input
                  className="invisible-input"
                  placeholder="Type in here"
                  value={this.state.myText}
                  onChange={(event) => {
                    const myTextValue = event.target.value;
                    this.setState({ myText: myTextValue });
                  }}
                />
              </form>
            </div>
            <div id="list">
              {this.state.textList.map((task) => (
                <p className="results">{task}</p>
              ))}
            </div>
            <div className="footerr">
              <button onClick={this.getRandomQuote}>Start again</button>
              <button onClick={this.addNewTask}>Show me text</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
