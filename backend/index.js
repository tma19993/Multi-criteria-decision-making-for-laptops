const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const colors = require("colors");
const bodyParser = require("body-parser");

const port = 5000;

//potrzeba zrobić 2 foreach'e ponieważ nie znajdziemy wartości

let cpuRatio = 0.3;
let gpuRatio = 0.25;
let ramRatio = 0.2;
let storageRatio = 0.15;
let price_ratio = 0.1;
// let screen_ratio:0.1,
//let  weigthRatio:0.1,
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

MongoClient.connect("mongodb://localhost:27017", (error, laptops) => {
  if (error) {
    console.log("Błąd połączenia z bazą danych");
    laptops.close();
  } else {
    let manufacturerList = [];
    let categoryList = [];
    let screenSizeList = [];
    let operationSystemList = [];
    const database = laptops.db("Dane");
    const lap = database.collection("laptops");
    lap.find({}).toArray((err, laptopsData) => {
      if (err) {
        console.log("Błąd zapytania: " + err);
      } else {
        laptopsData.filter((laptop) => {
          manufacturerList.push(laptop.Manufacturer);
          categoryList.push(laptop.Category);
          screenSizeList.push(laptop.Screen_Size);
          operationSystemList.push(laptop.Operating_System);
        });
        manufacturerList = manufacturerList.filter(
          (manufacturer, index, array) => array.indexOf(manufacturer) === index
        );
        // console.log(manufacturerList);
        categoryList = categoryList.filter(
          (category, index, array) => array.indexOf(category) === index
        );
        screenSizeList = screenSizeList.filter(
          (screenSize, index, array) => array.indexOf(screenSize) === index
        );
        operationSystemList = operationSystemList.filter(
          (operationSystem, index, array) =>
            array.indexOf(operationSystem) === index
        );
        laptops.close();
        const List = {
          manufacturerList,
          categoryList,
          screenSizeList,
          operationSystemList,
        };
        app.get("/FilterForm", (req, res) => res.send(List));
      }
    });
  }
});

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
      // console.log("Jesteś połączony z bazą danych".green);
      // console.log("Za 5 sekund uruchomi się aplikacja".red);
      console.log("Aktualizacja rankingu".green);

      const database = laptops.db("Dane");
      const lap = database.collection("laptops");
      lap.find({}).toArray((err, laptopsData) => {
        if (err) {
          console.log("Błąd zapytania".bold.red);
        } else {
          // console.log("Zapytanie zostało przyjęte");

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
            Storage = parseInt(Storage);

            //Szukanie największej wartości
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
            Storage = parseInt(Storage);

            //działania
            const cpuRating = (CPU_Mark / maxCpu) * cpuRatio;
            const gpuRating = (G3D_Mark / maxGpu) * gpuRatio;
            const ramRating = (RAM / maxRam) * ramRatio;
            const storageRating = (Storage / maxStorage) * storageRatio;
            const priceRating = (minPrice / Price_in_Euros) * price_ratio;
            //suma
            const result =
              cpuRating + gpuRating + ramRating + storageRating + priceRating;
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

// console.log(globalArray);
app.get("/", (req, res) => res.send("Hello world"));
app.get("/GlobalArray", (req, res) => res.send(globalArray));
//komunikaty na końcu
app.listen(port, () => {
  console.log("Aplikacja działa".bold.green);
  console.log(
    "Aplikacja nasłuchuje na porcie: ".green + colors.bold.green(port)
  );
});
