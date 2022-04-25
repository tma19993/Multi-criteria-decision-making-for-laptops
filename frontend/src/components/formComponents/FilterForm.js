import React, { Component } from "react";
import axios from "axios";
class FilterForm extends Component {
  state = {
    manufacturerList: [],
    categoryList: [],
    screenSizeList: [],
    operationSystemList: [],
  };
  componentDidMount = () => {
    axios.get("http://localhost:5000/FilterForm").then((response) => {
      // console.log(response.data);
      this.setState({
        manufacturerList: response.data.manufacturerList,
        categoryList: response.data.categoryList,
        screenSizeList: response.data.screenSizeList,
        operationSystemList: response.data.operationSystemList,
      });
    });
  };

  render() {
    const {
      manufacturerList,
      categoryList,
      screenSizeList,
      operationSystemList,
    } = this.state;
    const manufacturers = manufacturerList.map((manufacture) => (
      <div key={manufacture}>
        <input type="checkbox" name={manufacture} value={manufacture} />
        <label htmlFor={manufacture}>{manufacture}</label>
      </div>
    ));
    const categories = categoryList.map((category) => (
      <div key={category}>
        <input type="checkbox" name={category} value={category} />
        <label htmlFor={category}>{category}</label>
      </div>
    ));
    const screenSizes = screenSizeList.map((screenSize) => (
      <div key={screenSize}>
        <input type="checkbox" name={screenSize} value={screenSize} />
        <label htmlFor={screenSize}>{screenSize}</label>
      </div>
    ));
    const operationSystems = operationSystemList.map((operationSystem) => (
      <div key={operationSystem}>
        <input type="checkbox" name={operationSystem} value={operationSystem} />
        <label htmlFor={operationSystem}>{operationSystem}</label>
      </div>
    ));
    return (
      <div className="filterForm">
        <div className="manufacturerList">
          <h3>Marki laptopa</h3>
          {manufacturers}
        </div>
        <div className="categoryList">
          <h3>Kategorie laptopa</h3>
          {categories}
        </div>
        <div className="screenSizeList">
          <h3>Rozmiary ekranów</h3>
          {screenSizes}
        </div>
        <div>
          <h3>Systemy operacyjne</h3>
          {operationSystems}
        </div>
      </div>
    );
  }
}

export default FilterForm;
