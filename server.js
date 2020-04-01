const express = require("express");
const Datastore = require("nedb");

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Started server at ${port}`);
});

app.use(express.static("public"));
app.use(express.json());

const database = new Datastore("database.db");
database.loadDatabase();

app.post("/diode", (request, response) => {
  console.log("I got a location!");
  const data = request.body;
  database.insert(data);
  console.log(data);
  response.json({
    status: "success",
    latitude: data.latitude,
    longitude: data.longitude
  });
});
