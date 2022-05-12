import React from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
const GeneratePDF = (props) => {
  const { array } = props;
  const pdfGenerate = () => {
    const doc = new jsPDF({ orientation: "l" });
    let laptops = [];
    let counter = 1;
    array.forEach((element) => {
      laptops.push([
        counter++,
        element.Manufacturer,
        element.Model_Name,
        element.Category,
        element.Screen_Size,
        element.Screen,
        element.CPU,
        element.RAM,
        element.Storage,
        element.GPU,
        element.Operating_System,
        element.Operating_System_Version,
        element.Weight,
        element.Price_in_Euros,
      ]);
    });
    doc.autoTable({
      theme: "grid",
      styles: { fontSize: 7 },
      head: [
        [
          "Miejsce",
          "Marka",
          "Model",
          "Kategoria",
          "Rozdzielczosc ekranu",
          "Przekatna ekranu",
          "Procesor",
          "RAM",
          "Pamiec wewnetrzna",
          "Karta graficzna",
          "System operacyjny",
          "Wersja Systemu",
          "Waga",
          "Cena w euro",
        ],
      ],
      body: laptops,
    });
    doc.save("Laptopy.pdf");
  };

  if (array.length > 0) {
    return (
      <section className="pdfObject">
        <Link to="/" className="backToStart">
          Wróć
        </Link>
        <button onClick={pdfGenerate} className="pdf">
          Pobierz wyniki w pdf
        </button>
      </section>
    );
  } else {
    return null;
  }
};

export default GeneratePDF;
