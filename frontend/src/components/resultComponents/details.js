import React from "react";
import "../../styles/details.css";
const Details = (props) => {
  console.log(props.changeActive);
  if (props.active) {
    return (
      <>
        <div className="detailsBGC"></div>
        <div className="details">
          <button onClick={props.changeActive}>Wyjdź</button>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default Details;
