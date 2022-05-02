import React, { useState } from "react";

import { motion } from "framer-motion/dist/framer-motion";
import DetailsButton from "./resultComponents/detailButton";
import ResultBar from "./resultComponents/resultBar";
import ResultList from "./resultComponents/ResultList";

import "../styles/welcomeResult.css";
const Result = () => {
  const [array, setArray] = useState([]);
  const [activeResults, setActiveResults] = useState(false);
  const getData = () => {
    fetch("http://localhost:5000/GlobalArray")
      .then((response) => response.json())
      .then((data) => setArray(data));
    setActiveResults(true);
  };
  let count = 0;
  const showlaptop = array.map((laptop) => (
    <div key={laptop._id} className="laptopslist">
      <span className="position">{++count}</span>
      <span className="laptopFullName">
        {laptop.Manufacturer}{" "}
        {laptop.Model_Name.length > 20
          ? laptop.Model_Name.substr(0, 13)
          : laptop.Model_Name}
      </span>
      <ResultBar result={laptop.sawResult} />
      <DetailsButton array={laptop} count={count} />
    </div>
  ));
  return (
    <motion.div
      intial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className={activeResults ? "close" : null}>
        <section className="welcomeResult">
          <div className="insideWelcomeResult">
            <p>Twoje wyniki są już gotowe</p>
            <button onClick={getData}>Wyświetl wyniki</button>
          </div>
        </section>
      </section>

      <section className={activeResults ? null : "close"}>
        

        <ResultList result={showlaptop} array={array} />
      </section>
    </motion.div>
  );
};

export default Result;
