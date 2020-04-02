const location_options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const pos_data = { latitude: undefined, longitude: undefined, mood: undefined };
const post_options = {
  method: "POST",
  headers: {
    "Content-type": "application/json"
  },
  body: JSON.stringify(pos_data)
};

if ("geolocation" in navigator) {
  console.log("Geolocation available!");
  navigator.geolocation.getCurrentPosition(
    async pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      document.getElementById("lat").textContent = lat.toFixed(3) + "°";
      document.getElementById("lng").textContent = lng.toFixed(3) + "°";
      pos_data.latitude = lat;
      pos_data.longitude = lng;
      console.log(pos_data);
    },
    error => console.error(error)
  );
} else {
  console.log("Geolocation not available!");
  alert("Geolocation not available!");
}

document
  .getElementById("submit_button")
  .addEventListener("click", sendLocation);

async function sendLocation() {
  const mood_inputVal = document.getElementById("mood").value;
  pos_data.mood = mood_inputVal;
  if (pos_data.latitude && pos_data.longitude) {
    if (pos_data.mood) {
      post_options.body = JSON.stringify(pos_data);
      const response = await fetch("/api", post_options);
      const response_json = await response.json();
      console.log(response_json);
      if (
        response_json.status === "success" &&
        response_json.latitude === pos_data.latitude &&
        response_json.longitude === pos_data.longitude &&
        response_json.mood === pos_data.mood
      ) {
        alert("Succesfully sent your location!  ◔ ⌣ ◔");
      } else {
        alert("I think, your location might not be recieved correctly. ◉_◉");
      }
    } else {
      alert("Write something in the input field ;)");
    }
  } else {
    alert("Location data not found! ◔̯◔");
  }
}
