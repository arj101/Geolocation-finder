const express = require("express");
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Listening at port ${port} ! `);
});

app.use(express.static("public"));
app.use(express.json());

app.post("/diode", (request, response) => {
  const data = request.body;
  console.log(data);
});
