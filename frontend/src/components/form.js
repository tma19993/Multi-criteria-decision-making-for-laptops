import React, { Component } from "react";
import axios from "axios";
import "../styles/form.css";
class Form extends Component {
  state = {
    cpu: 0,
    gpu: 0,
    ram: 0,
    storage: 0,
    price: 0,
    // screen:0,
    // weigth:0,
  };
  handleEvent = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const { cpu, gpu, ram, storage, price } = this.state;
    const frontRatio = {
      cpu: cpu / 100,
      gpu: gpu / 100,
      ram: ram / 100,
      storage: storage / 100,
      price: price / 100,
    };
    console.log(frontRatio.cpu);
    axios
      .post("http://localhost:5000/GetRatio", frontRatio)
      .then((response) => {
        console.log("data send" + response);
      })
      .catch((err) => {
        console.log(err);
        console.log("Problem przy axios.post");
      });
  };
  render() {
    const { cpu, gpu, ram, storage, price } = this.state;
    return (
      <section className="form" id="formId">
        <h2 className="formHeader">Formularz</h2>
        <form
          onSubmit={this.handleSubmit}
          action="http://localhost:5000/GetRatio"
          method="POST"
        >
          <div className="inputCpuStyle">
            <h6>CPU</h6>
            <input
              type="range"
              name="cpu"
              value={cpu}
              min="0"
              max={
                parseInt(gpu) +
                  parseInt(ram) +
                  parseInt(storage) +
                  parseInt(price) >=
                100
                  ? 0
                  : 100 -
                    parseInt(gpu) +
                    parseInt(ram) +
                    parseInt(storage) +
                    parseInt(price)
              }
              onChange={(e) => this.handleEvent(e)}
            />
          </div>
          <div className="inputGpuStyle">
            <h6>GPU</h6>
            <input
              type="range"
              name="gpu"
              value={gpu}
              min="0"
              max={
                parseInt(cpu) +
                  parseInt(ram) +
                  parseInt(storage) +
                  parseInt(price) >=
                100
                  ? 0
                  : 100 -
                    parseInt(cpu) +
                    parseInt(ram) +
                    parseInt(storage) +
                    parseInt(price)
              }
              onChange={(e) => this.handleEvent(e)}
            />
          </div>
          <div className="inputRamStyle">
            <h6>RAM</h6>
            <input
              type="range"
              name="ram"
              value={ram}
              min="0"
              max={
                parseInt(cpu) +
                  parseInt(gpu) +
                  parseInt(storage) +
                  parseInt(price) >=
                100
                  ? 0
                  : 100 -
                    parseInt(cpu) +
                    parseInt(gpu) +
                    parseInt(storage) +
                    parseInt(price)
              }
              onChange={(e) => this.handleEvent(e)}
            />
          </div>
          <div className="inputStorageStyle">
            <h6>Storage</h6>
            <input
              type="range"
              name="storage"
              value={storage}
              min="0"
              max={
                parseInt(cpu) +
                  parseInt(gpu) +
                  parseInt(ram) +
                  parseInt(price) >=
                100
                  ? 0
                  : 100 -
                    parseInt(cpu) +
                    parseInt(gpu) +
                    parseInt(ram) +
                    parseInt(price)
              }
              onChange={(e) => this.handleEvent(e)}
            />
          </div>
          <div className="inputPriceStyle">
            <h6>Price</h6>
            <input
              type="range"
              name="price"
              value={price}
              min="0"
              max={
                parseInt(cpu) +
                  parseInt(gpu) +
                  parseInt(ram) +
                  parseInt(storage) >=
                100
                  ? 0
                  : 100 -
                    parseInt(cpu) +
                    parseInt(gpu) +
                    parseInt(ram) +
                    parseInt(storage)
              }
              onChange={(e) => this.handleEvent(e)}
            />
          </div>
          <button type="submit" name="button" onClick={this.props.formUpdate}>
            Wyślij
          </button>
        </form>
        <a href="#StartSide">Wróć do strony startowej</a>
      </section>
    );
  }
}

export default Form;
