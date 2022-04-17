import React, { Component } from "react";
import axios from "axios";

import Form from "./form";
import StartComponent from "./StartComponent";
import ResultBar from "./resultComponents/resultBar";
import ResultList from "./ResultList";
import "../styles/App.css";
import Details from "./resultComponents/details";

class App extends Component {
  state = {
    array: [],
    activeList: false,
    activeDetails: false,
  };

  formUpdate = () => {
    axios.get("http://localhost:5000/GlobalArray").then((response) => {
      console.log(response.data);
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
  handleActiveDetails = () => {
    this.setState({
      activeDetails: !this.state.activeDetails,
    });
  };
  scrollLock = () => {
    const scrollTop = window.pageYOffset;
    const scrollLeft = window.pageXOffset;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  };

  render() {
    const { array, activeList, activeDetails } = this.state;
    let count = 0;
    const showlaptop = array.map((laptop) => (
      <div key={laptop._id}>
        <span className="position">{++count}</span>
        <span className="laptopFullName">
          {laptop.Manufacturer} {laptop.Model_Name}
        </span>
        <ResultBar result={laptop.sawResult} />
        <button className="detailButton" onClick={this.handleActiveDetails}>
          Dane techniczne
        </button>
      </div>
    ));
    if (activeDetails) {
      this.scrollLock();
    }
    console.log(activeDetails);

    return (
      <div className="App">
        <StartComponent />
        <Form
          formUpdate={this.formUpdate}
          activeResult={this.handleActivelist}
        />
        <ResultList result={showlaptop} active={activeList} />
        <Details
          active={activeDetails}
          changeActive={this.handleActiveDetails}
        />
      </div>
    );
  }
}

export default App;
