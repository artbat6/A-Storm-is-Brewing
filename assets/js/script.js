var citySearchEl = document.querySelector("#citySearch");
var cityInputEl = document.querySelector("#searchInput");
var cityName = {};

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    cityName = cityInputEl.value.trim();
  
    if (cityName) {
        getWeather(cityName);
        getBreweries(cityName);
        
        // clear old content
        cityInputEl.value='';
    } else {
      alert('Please enter a valid city');
    }
  };

var getWeather = function(city) {
    var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=e36fb2ce796485b4932661a9398d1827';

    // make a get request to url
    fetch(weatherApiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(weatherData) {
            console.log(weatherData);
            displayWeather(weatherData);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function(error) {
        alert('Unable to connect to Open Weather');
      });
    };

var displayWeather = function(cityData) {
    //put all the weather elements here
    
    };

var getBreweries = function(city) {
    var breweryApiUrl = 'https://api.openbrewerydb.org/breweries?by_city=' + city;

    // make a get request to url
    fetch(breweryApiUrl)
        .then(function(response) {
        // request was successful
        if (response.ok) {
            console.log(response);
            response.json().then(function(breweryData) {
            console.log(breweryData);
            displayBreweries(breweryData);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
        })
        .catch(function(error) {
        alert('Unable to connect to brewery database');
        });
    };

var displayBreweries = function(cityData) {
    //put all the brewery list elements here
    
    };

citySearchEl.addEventListener("submit", formSubmitHandler);