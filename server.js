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

app.get("/api", (request, response) => {
  database.find({}, (err, docs) => {
    if (docs) {
      response.json(docs);
      console.log("Succesfully sent data to client!");
    } else if (err) {
      response.end();
      console.log("Error occured while sending data!");
      return;
    }
  });
});

app.post("/api", (request, response) => {
  console.log("I got a location!");
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  console.log(data);
  response.json({
    status: "success",
    latitude: data.latitude,
    longitude: data.longitude,
    mood: data.mood
  });
});
