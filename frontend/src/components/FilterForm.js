import React, { Component } from "react";
import axios from "axios";
class FilterForm extends Component {
  state = {
    array: [],
  };
  componentDidMount = () => {
    axios.get("http://localhost:5000/FilterForm").then((response) => {
      // console.log(response.data);
      this.setState({
        array: response.data,
      });
    });
  };
  render() {
    // const {
    //   manufacturerList,
    //   categoryList,
    //   screenSizeList,
    //   operationSystemList,
    // } = this.state.array;
    // console.log(manufacturerList);

    return <div className="filterForm"></div>;
  }
}

export default FilterForm;
