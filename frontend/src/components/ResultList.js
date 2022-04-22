import React from "react";
import "../styles/resultList.css";
const ResultList = (props) => {
  // console.log(props.active);
  return (
    <>
      {props.active ? (
        <div className="resultBar">
          <p>Miejsce</p>
          <p>Laptop</p>
          <p>punktacja</p>
          <p>Szczegóły</p>
        </div>
      ) : null}
      <div className="resultList">{props.result}</div>
    </>
  );
};

export default ResultList;
