const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const APP_ID = "&units=imperial&appid=ee6accf634c9e58a5b694bb8d6ef0eb8";
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
      _name.textContent = weatherResults.name;
      _temp.textContent = weatherResults.main.temp;
      _weather.textContent = weatherResults.weather[0].main;
      parent.appendChild(_name);
      parent.appendChild(_temp);
      parent.appendChild(_weather);
    })
}

document.querySelector(".search-button").addEventListener("click", weatherRequest);