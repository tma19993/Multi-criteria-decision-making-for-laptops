import React, { Component } from "react";
import axios from "axios";
import Form from "./form";
import StartComponent from "./StartComponent";
import ResultBar from "./resultComponents/resultBar";
import ResultList from "./ResultList";
import "../styles/App.css";

class App extends Component {
  state = {
    array: [],
    active: false,
  };

  formUpdate = () => {
    axios.get("http://localhost:5000/GlobalArray").then((response) => {
      console.log(response.data);
      this.setState({
        array: response.data,
      });
    });
  };
  handleActive = () => {
    this.setState({
      active: true,
    });
  };
  render() {
    let count = 0;
    const showlaptop = this.state.array.map((laptop) => (
      <div key={laptop._id}>
        <span className="position">{++count}</span>
        <span className="laptopFullName">
          {laptop.Manufacturer} {laptop.Model_Name}
        </span>
        <ResultBar result={laptop.sawResult} />
        <span className="details">det</span>
      </div>
    ));
    // console.log(this.state.array);
    return (
      <div className="App">
        <StartComponent />
        <Form formUpdate={this.formUpdate} activeResult={this.handleActive} />
        <ResultList result={showlaptop} active={this.state.active} />

        {/* <div >{showlaptop}</div> */}
      </div>
    );
  }
}

export default App;
