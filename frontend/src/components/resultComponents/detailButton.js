import React, { useState } from "react";
import Details from "./details";
import { ImCross } from "react-icons/im";
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
        <>
          <button onClick={() => setActive(!active)} className="quit">
            <ImCross />
          </button>
          <Details array={props.array} position={props.count} />
        </>
      ) : null}
    </>
  );
};
export default DetailsButton;
