var cityInputEl = document.querySelector("#searchInput");
var citySearchEl = document.querySelector("#citySearch");
var cityName = {};

var formSubmitHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  cityName = cityInputEl.value.trim();
  // put submitted name into #cityName field
  var cityNameEl = document.querySelector("#cityName");
  cityNameEl.textContent = cityName;

  if (cityName) {
    getWeather(cityName);
    getBreweries(cityName);

    // clear old content
    cityInputEl.value = "";
  } else {
    alert("Please enter a valid city");
  }
};

var getWeather = function (city) {
  var weatherApiUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=e36fb2ce796485b4932661a9398d1827";

  // make a get request to url
  fetch(weatherApiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (weatherData) {
          console.log(weatherData);
          displayWeather(weatherData);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather");
    });
};

var displayWeather = function (cityData) {
  //put all the weather elements here
  console.log(cityData);
  var tempEl = document.querySelector("#temp");
  tempEl.innerText = cityData.main.temp + "º";
};

var getBreweries = function (city) {
  var breweryApiUrl = "https://api.openbrewerydb.org/breweries?by_city=" + city;

  // make a get request to url
  fetch(breweryApiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (breweryData) {
          console.log(breweryData);
          displayBreweries(breweryData);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to brewery database");
    });
};

var displayBreweries = function (breweryData) {
  var breweriesArray = createBreweriesArray(breweryData);
  //put all the brewery list elements here
  for (var i = 0; i < 3; i++) {
    var breweryNameEl = breweriesArray[i].name;
    var nameLabel = document.querySelector("#brew" + i);
    nameLabel.innerText = breweryNameEl;
    var typeEl = breweriesArray[i].brewery_type;
    var typeLabel = document.querySelector("#type" + i);
    typeLabel.innerText = "Type of brewery: " + typeEl;
  }
};

// the function below takes the data from the brewery api
// and returns the top 3 breweries with type != "planning"
var createBreweriesArray = function (breweryData) {
  var breweriesArray = [];
  var i = 0;
  while (breweriesArray.length != 3) {
    var breweryType = breweryData[i].brewery_type;
    if (breweryType != "planning") {
      breweriesArray.push(breweryData[i]);
    }
    i++;
  }
  return breweriesArray;
};

citySearchEl.addEventListener("submit", formSubmitHandler);
