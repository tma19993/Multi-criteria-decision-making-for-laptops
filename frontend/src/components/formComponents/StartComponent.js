import React, { Component } from "react";
import "../../styles/StartComponent.css";
import logo from "../../pictures/logo.png";
class StartComponent extends Component {
  scrollToForm = (e) => {
    e.preventDefault();
    const scrollLeft = window.pageXOffset + 10;
    let formPositionTop = document.getElementById("formId").offsetTop;
    window.scroll({
      top: formPositionTop,
      left: scrollLeft,
      behavior: "smooth",
    });
  };
  render() {
    return (
      <section id="StartSide">
        <div className="StartBGC"></div>
        <img src={logo} alt="logo" className="logo" />
        <div className="welcome">
          <h1>Witaj</h1>
          <p>Ta aplikacja pomoże ci wybrać swój wymarzony laptop</p>
        </div>
        <div className="startBTN">
          <button className="start" onClick={this.scrollToForm}>
            Zaczynajmy
          </button>
        </div>
      </section>
    );
  }
}
export default StartComponent;

// href="#formId"
