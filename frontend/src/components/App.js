import React, {  useState } from "react";
import DetailsButton from "./resultComponents/detailButton";
import Form from "./formComponents/form";
import StartComponent from "./StartComponent";
import ResultBar from "./resultComponents/resultBar";
import ResultList from "./resultComponents/ResultList";
import GeneratePDF from "./resultComponents/GeneratePDF";
import "../styles/App.css";

const App = () => {
  const [array, setArray] = useState([]);
  let active = false;

  const getData = () => {
    fetch("http://localhost:5000/GlobalArray")
      .then((response) => response.json())
      .then((data) => setArray(data));
  };

  const activeResult = () => {
    active = true;
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
  console.log(array);
  return (
    <div className="App">
      <StartComponent />
      <Form activeResult={activeResult} />
      <button onClick={getData}>Wyświetl wyniki</button>
      <GeneratePDF array={array} />
      <ResultList result={showlaptop} />
    </div>
  );
};

export default App;
