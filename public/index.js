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

fetch("/diode", options)
  .then(() => console.log("Succesfully send data!"))
  .catch(error => console.error(error));

const location_options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

navigator.geolocation.getCurrentPosition(
  pos => console.log(pos),
  error => console.error(error),
  location_options
);
