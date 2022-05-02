import React from "react";
import "../../styles/resultBar.css";
const ResultBar = (props) => {
  const widthInsideBar = 100 * props.result;
  console.log(widthInsideBar);
  const widthResultBar = {
    height: "100%",
    width: widthInsideBar + "%",
    margin: "0",
    backgroundColor: "#c0bd8d",
  };
  return (
    <>
      <section className="backroundResultBar">
        <section>
          <section style={widthResultBar}></section>
        </section>
      </section>
      <p className="numberResultBar">{Math.round(widthInsideBar)} / 100</p>
    </>
  );
};

export default ResultBar;
