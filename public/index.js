function setup() {

  noCanvas();
  const video = createCapture(VIDEO);
  video.size(480, 360);
  video.id("video");

  const location_options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  const pos_data = {
    latitude: undefined,
    longitude: undefined,
    mood: undefined,
    image64:undefined
  };
  const post_options = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(pos_data)
  };

  if ("geolocation" in navigator) {
    console.log("Geolocation available! ");
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
      error => {
        const error_code = error.code;
        if (error_code === 1) {
          alert(
            "It would be nice if you allowed me to access your location. 😞 \nMost of the time it as easy as turning on location and reloading this page. 😉 "
          );
        }
      }
    );
  } else {
    console.log("Geolocation not available! ¬_¬ 😯");
    alert("Geolocation not available! ¬_¬ 😯");
  }

  document
    .getElementById("submit_button")
    .addEventListener("click", sendLocation);

  async function sendLocation() {
    const mood_inputVal = document.getElementById("mood").value;
    video.loadPixels();
    const image64 = video.canvas.toDataURL('image/jpeg',0.5);
    console.log(pos_data);
     pos_data.image64 = image64;
  
    if (pos_data.latitude && pos_data.longitude) {
      if (mood_inputVal) {
          pos_data.mood = mood_inputVal;
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
          alert("Succesfully sent your location!  ◔ ⌣ ◔ 😃");
        } else {
          alert(
            "I think, your location might not be recieved correctly. ◉_◉ 😑"
          );
        }
      } else {
        alert("Write something in the input field ;) 😜");
      }
    } else {
      alert("Location data not found! ◔̯◔ 😑");
    }
  }

 
}
