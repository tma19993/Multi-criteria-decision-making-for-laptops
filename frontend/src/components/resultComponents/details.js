import React from "react";
import "../../styles/details.css";

const Details = (props) => {
  const {
    Manufacturer,
    Model_Name,
    Category,
    Screen_Size,
    Screen,
    CPU,
    RAM,
    Storage,
    GPU,
    Operating_System,
    Weight,
    Price_in_Euros,
  } = props.array;
  return (
    <section className="detailWindowBGW">
       <h2>Specyfikacja laptopa na miejscu {props.position}</h2>
      <section className="detailWindow">
        <div className="leftDetail">
          <p>Marka:</p>
          <p>Model:</p>
          <p>Kategoria:</p>
          <p>Rozdzielczość ekranu:</p>
          <p>Przekątna ekranu:</p>
          <p>Procesor:</p>
          <p>RAM:</p>
          <p>Pamięc wewnętrzna:</p>
          <p>Karta graficzna:</p>
          <p>System operacyjny:</p>
          <p>Waga:</p>
          <p>Cena w euro:</p>
        </div>
        <div className="rightDetail">
          <p>{Manufacturer}</p>
          <p>{Model_Name}</p>
          <p>{Category}</p>
          <p>{Screen}</p>
          <p>{Screen_Size}</p>
          <p>{CPU}</p>
          <p>{RAM}</p>
          <p>{Storage}</p>
          <p>{GPU}</p>
          <p>{Operating_System}</p>
          <p>{Weight}</p>
          <p>{Price_in_Euros}</p>
        </div>
      </section>
    </section>
  );
};

export default Details;
