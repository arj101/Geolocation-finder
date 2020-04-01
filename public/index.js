const location_options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

if ("geolocation" in navigator) {
  console.log("Geolocation available!");
  navigator.geolocation.getCurrentPosition(
    async pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      document.getElementById("lat").textContent = lat.toFixed(3);
      document.getElementById("lng").textContent = lng.toFixed(3);
      const pos_data = { lat, lng };
      const post_options = {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(pos_data)
      };

      const response = await fetch("/diode", post_options);
      const response_txt = await response.text();
      console.log(response_txt);
    },
    error => console.error(error)
  );
} else {
  console.log("Geolocation not available!");
  alert("Geolocation not available!");
}
