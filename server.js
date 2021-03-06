const express = require("express");
const Datastore = require("nedb");
var base64ToImage = require("base64-to-image");

const app = express();
const app2 = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Started server at ${port}`);
});
let n = 0;
app.use(express.static("public"));
app.use(express.json());

const database = new Datastore({ filename: "database.db" });
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

app.get("/clear", (requset, response) => {
  console.log("I got a clear request :|");
  database.remove({}, { multi: true }, (err, success) => {
    if (success) {
      console.log("Database clear");
      response.json({ status: "cleared", timestamp: Date.now() });
    } else if (err) {
      console.log(err);
      response.end();
    }
  });
});

app.post("/api", async (request, response) => {
  console.log("I got a location!");
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  const img_resp = await convertToimg(data.image64, "images/", `image${n}`);
  data.img_dir = `images/${img_resp.fileName}`;
  database.insert(data);
  console.log(data);
  console.log(img_resp);

  n++;

  response.json({
    status: "success",
    latitude: data.latitude,
    longitude: data.longitude,
    mood: data.mood
  });
});

async function convertToimg(img64, path, name) {
  const resp = await base64ToImage(img64, path, {
    fileName: name,
    type: "png"
  });
  return resp;
}
