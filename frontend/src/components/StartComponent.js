import React, { Component } from "react";
import "../styles/StartComponent.css";
import logo from "../pictures/logo.png";
class StartComponent extends Component {
  render() {
    return (
      <section id="StartSide">
        <div className="StartBGC"></div>
        <img src={logo} alt="logo" className="logo" />
        <div className="welcome">
          <h1>Witaj</h1>
          <p>Ta aplikcaja pomoże ci wybrać swój wymarzony laptop</p>
        </div>
        <div className="startBTN">
          <a href="#formId" className="start">
            Zaczynajmy
          </a>
        </div>
      </section>
    );
  }
}
export default StartComponent;
