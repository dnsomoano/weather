// Page class
class WholePage {
  constructor(page) {
    this.page = page;
  }

  render() {
    document.addEventListener("DOMContentLoaded", main)
  }
}


// API class
class weatherAPI {
  constructor(searchTerm) {
    this.searchTerm = searchTerm;
    this.API_URL =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      searchTerm +
      ',us&units=imperial&appid=ee6accf634c9e58a5b694bb8d6ef0eb8';
  }

  getUserInput() {
    // User input item
    const userInput = document.querySelector('.search-box').value;
    return userInput;
  }
  getWeatherByZipCode() {
    // http request for API
    fetch(this.API_URL)
      // promise is to hold
      .then((resp) => {
        console.log(resp);
        // if http request is valid, return json
        if (resp.status === 200) {
          return resp.json();
        } else {
          console.log('err', resp);
        }
      })
      .then((weatherResults) => {
        // a new instance using a reference as an argument
        const printToDOM = new AddToDOM(weatherResults);
        // console.log(printToDOM);
        printToDOM.addForecastToDOM();
      });
  }
}

class AddToDOM {
  constructor(message) {
    this.message = message;
    this.parent = document.querySelector('.weather-results');
  }

  // Method for calling back to dom
  addForecastToDOM() {
    // created element for name of city
    const weatherResults = this.message;
    const _name = document.createElement('li');
    _name.textContent = 'The city: ' + weatherResults.name;
    this.parent.appendChild(_name);

    // created element for temperature of city
    const _temp = document.createElement('li');
    _temp.textContent = 'The Temperature: ' + weatherResults.main.temp;
    this.parent.appendChild(_temp);

    // created element for forecast
    const _weather = document.createElement('li');
    _weather.textContent = 'The forecast right now: ' + weatherResults.weather[0].main;
    this.parent.appendChild(_weather);

  }
}

class Location {
  constructor() {
    this.parent = document.querySelector('.weather-results');
  }

  getLocation() {
    // call for location and create element onto DOM
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);

      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      // Debug messages
      // console.log(latitude);
      // console.log(longitude);
      const parent = document.querySelector('.weather-results');
      const _latitude = document.createElement('li');
      const _longitude = document.createElement('li');
      _latitude.textContent = latitude;
      _longitude.textContent = longitude;
      parent.appendChild(_latitude);
      parent.appendChild(_longitude);
    });
  }
}

const weatherRequestEvent = () => {
  // new instance of the weatherAPI for getUserInput
  const _input = new weatherAPI();
  _input.getUserInput();
  _input.getWeatherByZipCode();
  // new instance of the class Location
  const userLocation = new Location();
  userLocation.getLocation();
  document.querySelector(".weather-results").textContent = "";
};

document.querySelector('form').addEventListener('submit', weatherRequestEvent);
document.querySelector('.search-button').addEventListener('click', weatherRequestEvent);