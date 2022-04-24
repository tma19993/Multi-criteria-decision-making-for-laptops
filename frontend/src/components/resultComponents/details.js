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
    Operating_System_Version,
    Weight,
    Price_in_Euros,
  } = props.array;
  return (
    <section className="detailWindowBGW">
      <section className="detailWindow">
        <div className="leftDetail">
          <p>Miejsce:</p>
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
          <p>Wersja Systemu:</p>
          <p>Waga:</p>
          <p>Cena:</p>
        </div>
        <div className="rightDetail">
          <p>{props.position}</p>
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
          <p>{Operating_System_Version}</p>
          <p>{Weight}</p>
          <p>{Price_in_Euros} &#8364;</p>
        </div>
      </section>
    </section>
  );
};

export default Details;
