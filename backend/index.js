const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const colors = require("colors");
const bodyParser = require("body-parser");

const port = 5000;

let cpuRatio = 0;
let gpuRatio = 0;
let ramRatio = 0;
let storageRatio = 0;
let price_ratio = 0;

let laptopsDatabase = [];
let ratigArray = [];
let globalArray = [];

//https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
//strona pomocna z CORS Error
//Wyeliminowanie błedów z CORS policy
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

//pobieranie danych z formularza

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.post("/GetRatio", (req, res) => {
  cpuRatio = req.body.cpu;
  gpuRatio = req.body.gpu;
  ramRatio = req.body.ram;
  storageRatio = req.body.storage;
  price_ratio = req.body.price;

  cpuRatio = parseFloat(cpuRatio) / 100;
  gpuRatio = parseFloat(gpuRatio) / 100;
  ramRatio = parseFloat(ramRatio) / 100;
  storageRatio = parseFloat(storageRatio) / 100;
  price_ratio = parseFloat(price_ratio) / 100;

  // połączenie z bazą
  MongoClient.connect("mongodb://localhost:27017", (error, laptops) => {
    if (error) {
      console.log("Błąd połączenia z bazą danych");
      laptops.close();
    } else {
      // console.log("Aktualizacja rankingu".green);

      const database = laptops.db("Dane");
      const lap = database.collection("laptops");
      lap.find({}).toArray((err, laptopsData) => {
        if (err) {
          console.log("Błąd zapytania".bold.red);
        } else {
          laptopsDatabase = laptopsData;

          let finialArray = [];

          let maxCpu = 0;
          let maxGpu = 0;
          let maxStorage = 0;
          let maxRam = 0;
          let minPrice = parseFloat(laptopsDatabase[0].Price_in_Euros);

          //pętla szykająca max wartości
          laptopsDatabase.forEach((laptop) => {
            //destrukturyzacja bazy danych
            let { CPU_Mark, G3D_Mark, Price_in_Euros, RAM, Storage } = laptop;
            //Parsowanie danych z bazy
            CPU_Mark = parseInt(CPU_Mark);
            G3D_Mark = parseInt(G3D_Mark);
            Price_in_Euros = parseFloat(Price_in_Euros);
            RAM = parseInt(RAM);

            if (Storage.indexOf("TB") === -1) {
              if (Storage.indexOf("+") === -1) {
                Storage = parseInt(Storage);
              } else {
                let beforePlus = parseInt(Storage);
                const id = Storage.indexOf("+");

                let afterPlus = parseInt(Storage.substr(id + 1, 8));

                Storage = beforePlus + afterPlus;
              }
            } else {
              if (Storage.indexOf("+") === -1) {
                Storage = Storage.substr(0, 1);
                Storage = parseInt(Storage + "000");
              } else {
                let beforePlus = parseInt(Storage);
                const id = Storage.indexOf("+");

                let afterPlus = parseInt(Storage.substr(id + 3, 1) + "000");
                Storage = beforePlus + afterPlus;
              }
            }

            //Szukanie największej wartości i najmniejszej
            if (CPU_Mark > maxCpu) {
              maxCpu = CPU_Mark;
            }
            if (G3D_Mark > maxGpu) {
              maxGpu = G3D_Mark;
            }
            if (RAM > maxRam) {
              maxRam = RAM;
            }
            if (Storage > maxStorage) {
              maxStorage = Storage;
            }
            if (minPrice > Price_in_Euros) {
              minPrice = Price_in_Euros;
            }

            //koniec foreach szukający wartości max
          });
          //forEach na obliczenia
          laptopsDatabase.forEach((laptop) => {
            //destrukturyzacja bazy danych
            let { _id, CPU_Mark, G3D_Mark, Price_in_Euros, RAM, Storage } =
              laptop;
            //Parsowanie danych z bazy
            CPU_Mark = parseInt(CPU_Mark);
            G3D_Mark = parseInt(G3D_Mark);
            Price_in_Euros = parseFloat(Price_in_Euros);
            RAM = parseInt(RAM);
            if (Storage.indexOf("TB") === -1) {
              if (Storage.indexOf("+") === -1) {
                Storage = parseInt(Storage);
              } else {
                let beforePlus = parseInt(Storage);
                const id = Storage.indexOf("+");

                let afterPlus = parseInt(Storage.substr(id + 1, 8));

                Storage = beforePlus + afterPlus;
              }
            } else {
              if (Storage.indexOf("+") === -1) {
                Storage = Storage.substr(0, 1);
                Storage = parseInt(Storage + "000");
              } else {
                let beforePlus = parseInt(Storage);
                const id = Storage.indexOf("+");

                let afterPlus = parseInt(Storage.substr(id + 3, 1) + "000");
                Storage = beforePlus + afterPlus;
              }
            }

            //działania
            const cpuRating = (CPU_Mark / maxCpu) * cpuRatio;
            const gpuRating = (G3D_Mark / maxGpu) * gpuRatio;
            const ramRating = (RAM / maxRam) * ramRatio;
            const storageRating = (Storage / maxStorage) * storageRatio;
            const priceRating = (minPrice / Price_in_Euros) * price_ratio;
            //suma
            const additiveRatios =
              cpuRatio + gpuRatio + ramRatio + storageRatio + price_ratio;
            let result = 0;
            if (additiveRatios <= 1) {
              result =
                cpuRating + gpuRating + ramRating + storageRating + priceRating;
            } else if (additiveRatios <= 2) {
              result =
                (cpuRating +
                  gpuRating +
                  ramRating +
                  storageRating +
                  priceRating) /
                2;
            } else if (additiveRatios <= 3) {
              result =
                (cpuRating +
                  gpuRating +
                  ramRating +
                  storageRating +
                  priceRating) /
                3;
            } else if (additiveRatios <= 4) {
              result =
                (cpuRating +
                  gpuRating +
                  ramRating +
                  storageRating +
                  priceRating) /
                4;
            } else {
              result =
                (cpuRating +
                  gpuRating +
                  ramRating +
                  storageRating +
                  priceRating) /
                5;
            }

            //wstawianie do tablicy raitingów
            ratigArray.push({
              _id: _id,
              result,
            });
          });
          //sortowanie tablicy raitingów
          ratigArray.sort((a, b) => (a.result > b.result ? 1 : -1));
          ratigArray.reverse();

          //wstawianie posortowanych danych do tablicy
          ratigArray.forEach((finalLaptop) => {
            for (let i = 0; i < laptopsDatabase.length; i++) {
              if (finalLaptop._id === laptopsDatabase[i]._id) {
                finialArray.push(laptopsDatabase[i]);
              }
            }
          });

          globalArray = finialArray;
          globalArray.forEach((laptop) => {
            ratigArray.forEach((rating) => {
              if (laptop._id === rating._id) {
                laptop.sawResult = rating.result;
              }
            });
          });
          //zakończenie połączenia
          laptops.close();
          //koniec else
        }

        //koniec find({}).toArray
      });
    }
    //koniec connect
  });
});

// app.get("/", (req, res) => res.send("Hello world"));
app.get("/GlobalArray", (req, res) => res.send(globalArray));
//komunikaty na końcu
app.listen(port, () => {
  console.log("Aplikacja działa".bold.green);
  console.log(
    "Aplikacja nasłuchuje na porcie: ".green + colors.bold.green(port)
  );
});
