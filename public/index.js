console.log("Working!!");
const data = {
  diode: 100,
  transistors: 1
};
const options = {
  method: "POST",
  headers: {
    "Content-type": "application/json"
  },
  body: JSON.stringify(data)
};
console.log(data);
fetch("/diode", options);
