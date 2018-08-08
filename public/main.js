const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const APP_ID = ",us&units=imperial&appid=ee6accf634c9e58a5b694bb8d6ef0eb8";


const weatherRequest = () => {

  // Takes input from user
  const usrInput = document.querySelector(".search-box").value;
  // string interpolation
  const _url = `${BASE_URL}${usrInput}${APP_ID}`;
  // http request for API
  fetch(_url)
    // promise is to hold
    .then(resp => {
      console.log(resp);
      // if http request is valid, return json
      if (resp.status === 200) {
        return resp.json();
      } else {
        console.log("err", resp);
      }
    })
    .then(weatherResults => {
      const parent = document.querySelector(".weather-results");
      const _name = document.createElement("li");
      const _temp = document.createElement("li");
      const _weather = document.createElement("li");
      _name.textContent = "The city: " + weatherResults.name;
      _temp.textContent = "The Temperature: " + weatherResults.main.temp;
      _weather.textContent = "The forecast right now: " + weatherResults.weather[0].main;
      parent.appendChild(_name);
      parent.appendChild(_temp);
      parent.appendChild(_weather);
    })
    
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
      const _geocode = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude +"&sensor=false";
      fetch(_geocode)
      .then(location => {
        let latitude = location.coords.latitude;
        let longitude = location.coords.latitude;
        console.log(latitude);
        console.log(longitude);
        const parent = document.querySelector(".weather-results");
        const _latitude = document.createElement("li");
        const _longitude = document.createElement("li");
        _latitude.textContent = latitude;
        _longitude.textContent = longitude;
        parent.appendChild(_latitude);
        parent.appendChild(_longitude);
      })
    })
};


// document.querySelector(".search-box").addEventListener("keypress", weatherRequest);
document.querySelector(".search-button").addEventListener("click", weatherRequest);