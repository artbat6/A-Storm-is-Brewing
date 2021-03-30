var cityInputEl = document.querySelector("#searchInput");
var citySearchEl = document.querySelector("#citySearch");
var resultsContainer = document.querySelector(".resultsContainer");
var cityName = {};
var selectEl = document.getElementById("selectForm")
var options = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

$(document).ready(function(){
  $('select').formSelect();
});

var populateOptions = function() {
  for (var i=0; i<options.length;i++) {
    var optionEl = document.createElement("option");
    optionEl.textContent=options[i];
    optionEl.value=options[i];
    selectEl.appendChild(optionEl);
  }
};

populateOptions();

var formSubmitHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  //get state value from select element
  stateName = selectEl.value;
  console.log(stateName);

  // get city value from input element
  cityName = cityInputEl.value.trim();
  // put submitted name into #cityName field
  var cityNameEl = document.querySelector("#cityName");
  cityNameEl.textContent = cityName +":";

  if (cityName && stateName) {
    getWeather(cityName);
    getBreweries(cityName, stateName);

    // clear old content
    cityInputEl.value = "";

  } else {
    alert("Please enter a valid city and state!");
  }
};

var getWeather = function (city) {
  var weatherApiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
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
  tempEl.innerText = Math.round(cityData.main.temp) + "º & " + cityData.weather[0].description;
};

var getBreweries = function (city, state) {
  var breweryApiUrl = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&by_state=" + state;

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

  //clear contents of container each search 
  resultsContainer.innerHTML = "";

  //put all the brewery list elements here
  for (var i = 0; i < 10; i++) {
    // create card element to display brewery information
    var breweryContainer = document.createElement("div");
    breweryContainer.classList = "col s12 card blue-grey darken-1 card-content white-text cardInfo";

    //create element to hold brewery name
    var nameEl = document.createElement("p");
    nameEl.classList = "card-title"
    nameEl.textContent = breweriesArray[i].name;

    //create element to hold brewery address
    var addressEl = document.createElement("p");
    addressEl.textContent = breweriesArray[i].street + ", " + breweriesArray[i].city + ", " + breweriesArray[i].state + ", " + breweriesArray[i].postal_code.slice(0,5);

    //create element to hold brewery link
    var linkEl = document.createElement("p");
    linkEl.innerHTML = '<a href="' + breweriesArray[i].website_url + '" target="_blank">' + breweriesArray[i].website_url + '</a>' 

    //append name, address, and link to container
    breweryContainer.appendChild(nameEl);
    breweryContainer.appendChild(addressEl);
    breweryContainer.appendChild(linkEl);

    //append brewery container to results container
    resultsContainer.appendChild(breweryContainer);
  }
};

// the function below takes the data from the brewery api
// and returns the top 10 breweries with type != "planning"
var createBreweriesArray = function (breweryData) {
  var breweriesArray = [];
  var i = 0;
  
  while (breweriesArray.length != 10) {
    var breweryType = breweryData[i].brewery_type;
    if (breweryType != "planning") {
      breweriesArray.push(breweryData[i]);
    }
    i++;
  }
  return breweriesArray;
};

citySearchEl.addEventListener("submit", formSubmitHandler);

//Sets up history to be loaded at the start of the page
function initializeHistory(){
  for(var i = 0; i < localStorage.length; i++){
    console.log(localStorage.getItem("searchInput" + i));
    document.getElementById("history" + i).innerHTML = localStorage.getItem("searchInput" + i);
  }
}

//Stores and displays history
function storeHistory(){
  var storedHistory = localStorage.length;
  var inputCity = document.getElementById("searchInput");
  localStorage.setItem("searchInput" + storedHistory, inputCity.value);
  for(var i = 0; i < localStorage.length; i++){
    //console.log(localStorage.getItem("cityHis" + i));
    document.getElementById("history" + i).innerHTML = localStorage.getItem("searchInput" + i);
    storedHistory++
    //console.log("stored History "+storedHistory);
    //console.log("local Storage "+localStorage.length);
  }
}

function loadHistory(){
    console.log("Test");
}

window.onload = initializeHistory();
