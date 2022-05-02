import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FilterForm from "./FilterForm";
import "../../styles/form.css";

const Form = () => {
  const [cpu, setCpu] = useState(0);
  const [gpu, setGpu] = useState(0);
  const [ram, setRam] = useState(0);
  const [storage, setStorage] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const frontRatio = {
      cpu,
      gpu,
      ram,
      storage,
      price,
    };
    console.log(frontRatio);
    axios
      .post("http://localhost:5000/GetRatio", frontRatio)
      .then((response) => {
        console.log("data send" + response);
      })
      .catch((err) => {
        console.log(err);
        console.log("Problem przy axios.post");
      });
    navigate("/result");
  };
  console.log(`${cpu}, ${gpu}, ${ram}, ${storage}, ${price}`);
  return (
    <section className="form" id="formId">
      <h2 className="formHeader">Formularz</h2>
      <p className="fromTextHeader">Wprowadź swoje preferencje dotyczące laptopa </p>
      <form
        onSubmit={handleSubmit}
        action="http://localhost:5000/GetRatio"
        method="POST"
      >
        <section className="filtrationForm">
          <FilterForm />
          <section className="SawMethod">
            <h2>Wspomaganie decyzji</h2>
            <p>
              W tej części formularza wybierasz co jest dla ciebie bardzo ważne
              lub mało ważne.
            </p>
            <section className="ratios">
              <h4>Procesor</h4>
              <div className="inputCpuStyle">
                <span>Mało ważny</span>
                <input
                  type="range"
                  name="cpu"
                  value={cpu}
                  min="0"
                  max="100"
                  onChange={(e) => setCpu(e.target.value)}
                />
                <span>Bardzo ważny</span>
              </div>
              <h4>Karta Graficzna</h4>
              <div className="inputGpuStyle">
                <span>Mało ważny</span>
                <input
                  type="range"
                  name="gpu"
                  value={gpu}
                  min="0"
                  max="100"
                  onChange={(e) => setGpu(e.target.value)}
                />
                <span>Bardzo ważny</span>
              </div>
              <h4>Pamięć RAM</h4>
              <div className="inputRamStyle">
                <span>Mało ważna</span>
                <input
                  type="range"
                  name="ram"
                  value={ram}
                  min="0"
                  max="100"
                  onChange={(e) => setRam(e.target.value)}
                />
                <span>Bardzo ważna</span>
              </div>
              <h4>Pamięć wewnętrzna</h4>
              <div className="inputStorageStyle">
                <span>Mało ważna</span>
                <input
                  type="range"
                  name="storage"
                  value={storage}
                  min="0"
                  max="100"
                  onChange={(e) => setStorage(e.target.value)}
                />
                <span>Bardzo ważna</span>
              </div>
              <h4>Cena</h4>
              <div className="inputPriceStyle">
                <span>Mało ważna</span>
                <input
                  type="range"
                  name="price"
                  value={price}
                  min="0"
                  max="100"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <span>Bardzo ważna</span>
              </div>
            </section>
          </section>
        </section>

        <button
          to="/result"
          type="submit"
          name="button"
          className="SubmitButton"
        >
          Wyślij
        </button>
      </form>
    </section>
  );
};

export default Form;
