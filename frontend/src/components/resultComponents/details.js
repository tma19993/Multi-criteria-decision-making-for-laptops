import React, { Component } from "react";
class Details extends Component {
  state = {
    active: false,
  };
  handleActive = () => {
    this.setState({
      active: !this.state.active,
    });
  };
  render() {
    return (
      <>
        <button onClick={this.handleActive}>Szczegóły</button>
      </>
    );
  }
}
export default Details;
