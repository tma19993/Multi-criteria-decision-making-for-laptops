import React, { useState } from "react";
import Details from "./details";
import Quit from "../../pictures/error.png";
const DetailsButton = (props) => {
  const [active, setActive] = useState(false);
  const scrollLock = () => {
    const scrollTop = window.pageYOffset;
    const scrollLeft = window.pageXOffset;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  };
  if (active) {
    scrollLock();
  } else {
    window.onscroll = null;
  }
  return (
    <>
      <button className="detailButton" onClick={() => setActive(!active)}>
        Specyfikacja 
      </button>
      {active ? (
        <img
          src={Quit}
          alt="Quit"
          className="quit"
          onClick={() => setActive(!active)}
        />
      ) : null}
      {active ? <Details array={props.array} position={props.count} /> : null}
    </>
  );
};
export default DetailsButton;
