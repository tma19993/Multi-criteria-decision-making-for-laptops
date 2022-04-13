import React, { Component } from "react";
import axios from "axios";
import Form from "./form";
import StartComponent from "./StartComponent";
import "../styles/App.css";

class App extends Component {
  state = {
    array: [],
  };

  formUpdate = () => {
    axios.get("http://localhost:5000/GlobalArray").then((response) => {
      // console.log(response.data);
      this.setState({
        array: response.data,
      });
    });
  };
  render() {
    let count = 0;
    const showlaptop = this.state.array.map((laptop) => (
      <li key={laptop._id}>
        <span className="miejsca">{++count}. </span>
        {laptop.Manufacturer} {laptop.Model_Name}
      </li>
    ));
    // console.log(this.state.array);
    return (
      <div className="App">
        <StartComponent />
        <Form formUpdate={this.formUpdate} />
        <ul className="App">{showlaptop}</ul>
      </div>
    );
  }
}

export default App;
