import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  return (
    <section className="form" id="formId">
      <form
        onSubmit={handleSubmit}
        action="http://localhost:5000/GetRatio"
        method="POST"
      >
        <section className="SawMethod">
          <h2>Formularz</h2>
          <p>
            Wybierz w formularzu, co jest dla Ciebie bardzo ważne lub mniej
            ważne, a następnie kliknij w przycisk Wyślij, za pomocą którego
            zostaniesz przekierowany na podstronę z wynikami.
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
