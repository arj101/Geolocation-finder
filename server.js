const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting server at ${port} `);
});

app.use(express.static("public"));
app.use(express.json());

app.post("/diode", (request, response) => {
  console.log("I got a request!");
  const data = request.body;
  console.log(data);

  response.send("Hello world");
});
