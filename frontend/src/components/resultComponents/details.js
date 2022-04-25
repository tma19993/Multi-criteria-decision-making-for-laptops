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
        <p>Miejsce:</p>
        <p>{props.position}</p>
        <p>Marka:</p>
        <p>{Manufacturer}</p>
        <p>Model:</p>
        <p>{Model_Name}</p>
        <p>Kategoria:</p>
        <p>{Category}</p>
        <p>Rozdzielczość ekranu:</p>
        <p>{Screen}</p>
        <p>Przekątna ekranu:</p>
        <p>{Screen_Size}</p>
        <p>Procesor:</p>
        <p>{CPU}</p>
        <p>RAM:</p>
        <p>{RAM}</p>
        <p>Pamięc wewnętrzna:</p>
        <p>{Storage}</p>
        <p>Karta graficzna:</p>
        <p>{GPU}</p>
        <p>System operacyjny:</p>
        <p>{Operating_System}</p>
        <p>Wersja Systemu:</p>
        <p>{Operating_System_Version}</p>
        <p>Waga:</p>
        <p>{Weight}</p>
        <p>Cena:</p>
        <p>{Price_in_Euros} &#8364;</p>
      </section>
    </section>
  );
};

export default Details;
