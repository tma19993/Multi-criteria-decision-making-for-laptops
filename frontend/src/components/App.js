import React, { Component } from "react";
import axios from "axios";

import DetailsButton from "./resultComponents/detailButton";
import Form from "./formComponents/form";
import StartComponent from "./StartComponent";
import ResultBar from "./resultComponents/resultBar";
import ResultList from "./resultComponents/ResultList";
import GeneratePDF from "./resultComponents/GeneratePDF";
import "../styles/App.css";

class App extends Component {
  state = {
    array: [],
    activeList: false,
  };

  formUpdate = async () => {
    axios.get("http://localhost:5000/GlobalArray").then((response) => {
      this.setState({
        array: response.data,
      });
    });
  };
  handleActivelist = () => {
    this.setState({
      activeList: true,
    });
  };

  render() {
    const { array, activeList } = this.state;
    let count = 0;
    const showlaptop = array.map((laptop) => (
      <div key={laptop._id} className="laptopslist">
        <span className="position">{++count}</span>
        <span className="laptopFullName">
          {laptop.Manufacturer}{" "}
          {laptop.Model_Name.length > 20
            ? laptop.Model_Name.substr(0, 13)
            : laptop.Model_Name}
        </span>
        <ResultBar result={laptop.sawResult} />
        <DetailsButton array={laptop} count={count} />
      </div>
    ));

    // console.log(showlaptop.length);
    return (
      <div className="App">
        <StartComponent />
        <Form
          formUpdate={this.formUpdate}
          activeResult={this.handleActivelist}
        />
        <GeneratePDF array={array} />
        <ResultList result={showlaptop} active={activeList} />
      </div>
    );
  }
}

export default App;
