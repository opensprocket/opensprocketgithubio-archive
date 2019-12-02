'use strict'; // use ES6 

//
// Weather Site JS Functions
//

// Global Variables
var pageNav = document.querySelector("#page-nav");
var statusBox = document.querySelector("#status");
var mainContent = document.querySelector("#main-content");
var locStor = window.localStorage;
var sesStor = window.sessionStorage;
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
// Custom header for NWS API
var idHeader = {headers: {"User-Agent": "Student Learning Project - bre13011@byui.edu"}};


console.log("Loaded functions.js successfully!"); // log the load of the script to console

// DOM event Listener
document.addEventListener("DOMContentLoaded", function(){
lastModified(); // builds and displays last modified date
copyrightYear();  // builds and displays copyright year

// event listener for mobile menu
const menuButton = document.querySelector("#menuBtn"); // select menu button
menuButton.addEventListener("click", toggleMobileMenu); // add event listener to menu button & call function on click

// Fetch information from JSON
// let weatherURL = "/weather/js/idahoweather.json";
// let cityName = $("#city").getAttribute("data-city");
// console.log(`cityName: ${cityName}`);
// fetchWeatherData(weatherURL, cityName);

getGeoLocation();

});

// Last modified date
function lastModified(){
  const longDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // full day name array
  const longMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // full month name array
  let lastMod = new Date(document.lastModified); // date prototype
  const dayName = longDayNames[lastMod.getDay()]; // get day name
  const monthName = longMonthNames[lastMod.getMonth()]; // get month name
  const formattedDate = "Updated: " + dayName + ", " + lastMod.getDate() + " " + monthName + " " + lastMod.getFullYear(); // build inner html output
  document.querySelector("#last-modified").innerText = formattedDate; // set inner html content
  console.log("lastModified(): Successfully built last modified date");
}

// Copyright date
function copyrightYear(){
  const currYear = new Date(); // new date
  const copyOutput =  "&copy; " + currYear.getFullYear() + " "; // build inner html content
  document.querySelector("#copyright-year").innerHTML = copyOutput; // set inner html content
  console.log("copyrightYear(): Successfully built the copyright year");
}

// Mobile menu toggle
function toggleMobileMenu(event){
  const navList = document.querySelector(".navigation"); // grab the first element with the class of navigation (ul in the nav section)
  navList.classList.toggle("responsive"); // toggle the class which affects the visibility of the menu
}

// Calculate the wind chill
function buildWindChill(speed, temp){
  // let feelTemp = document.getElementById("wind-chill"); // grab the span used to hold the wc
  let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16); // quik maffs (for a computer)
  console.log(`buildWindChill(): The wind chill is: ${wc}`); // log wc to console
  wc = Math.floor(wc); // round down to the nearest int
  wc = (wc > temp) ? temp:wc; // if chill > temp, return temp
  console.log(`buildWindChill(): The wind chill is: ${wc}`); // log wc to console
  return wc; // return wind chill
}

// Time ball indicator
function timeBall(hour){
  let x = document.querySelectorAll(".ball"); // build list of all .ball elements
  let hr = "b" + hour; // build ball position CSS
  console.log(`timeBall(): Value of hour: ${hour}`);
  for (let item of x){
    item.classList.toggle(hr); // set class which defines ball position to appropriate hour
  }
}

// Summary background image switching
function changeSummaryBackground(currCond){
  console.log(`Value of currCond: ${currCond}`);
  let condition = getShortForecast(currCond);
  // (currCond.toLowerCase()).trim(); // standardize input
  console.log(`Value of condition: ${condition}`);
  let conditionIndex = 0; // set condition index to 0
  console.log(`Value of conditionIndex: ${conditionIndex}`);
  // determine available width
  let width = window.innerWidth;
  console.log(`Screen Width: ${width}`);

  // check if screen is tablet or desktop widths and adjust starting point for condition index
  if (width > 475 && width <= 800) {
    conditionIndex += 5;
    console.log(`Updated value of conditionIndex: ${conditionIndex}`);
  } else if (width > 800) {
    conditionIndex += 10
  }

  // store paths to specific width images
  const imgURLS = ["/400w/clear.jpg", "/400w/clouds.jpg", "/400w/fog.jpg", "/400w/rain.jpg", "/400w/snow.jpg",
                  "/600w/clear.jpg", "/600w/clouds.jpg", "/600w/fog.jpg", "/600w/rain.jpg", "/600w/snow.jpg", 
                  "/800w/clear.jpg", "/800w/clouds.jpg", "/800w/fog.jpg", "/800w/rain.jpg", "/800w/snow.jpg",];
  // rest of directory structure
  const imgDirPrefix = "url(/weather/locations/images";
  const imgDirPostfix = ")"

  // increment condition index based on weather status
  switch (condition) {
    case "clear":
      conditionIndex += 0;
      break;
    case "cloudy":
      conditionIndex += 1;
      break;
    case "fog":
      conditionIndex += 2;
      break;
    case "rain":
      conditionIndex += 3;
      break;
    case "snow":
      conditionIndex += 4;
      break;
    default:
      console.log("changeSummaryBackground() Error: Weather type is invalid.");
      break;
  }
  console.log(`Value of conditionIndex: ${conditionIndex}`);
  
  // build image url() CSS variable based on conditionIndex
  let imageURL = imgDirPrefix + imgURLS[conditionIndex] + imgDirPostfix;
  console.log(`imageURL is: ${imageURL}`);

  // set background image
  const backgroundImg = document.body.style; // used to access css
  // console.log(`backgroundImg: ${backgroundImg}`);
  backgroundImg.setProperty("--dynamic-weather-background", `${imageURL}`); 
  console.log(`${imageURL} has been set as the background.`);
}

function getShortForecast (shortForecast) {
  let searchTerm = shortForecast.toLowerCase();
  let keyword;
  if (searchTerm.includes("snow") || searchTerm.includes("blizzard") || searchTerm.includes("freezing")) {
    keyword = "snow"
  }
  if (searchTerm.includes("rain") || searchTerm.includes("sleet") || searchTerm.includes("freezing") || searchTerm.includes("thunder") || searchTerm.includes("sleet")) {
    keyword = "rain";
  }
  if (searchTerm.includes("cloudy") || searchTerm.includes("overcast") || searchTerm.includes("mostly")) {
    keyword = "cloudy";
  }
  if (searchTerm.includes("sunny") || searchTerm.includes("clear")) {
    keyword = "clear";
  }
  return keyword;
}

// // Fetch weather data and store in local storage 
// // use only for pages built from static JSON!
// function fetchWeatherData(weatherURL, cityName){
//   // let cityName = "Preston"; // Targeted city
//   fetch(weatherURL)
//   .then(function(response){
//     if(response.ok){
//       return response.json(); // return a json file
//     }
//     throw new error("Network response was not ok."); // log new error to console
//   })
//   .then(function(data){
//     console.log("fetchWeatherData(): data recived from fetchWeatherData():")
//     console.log(data); // Verify and display data recieved
//     let city = data[cityName]; // uses cityName to ID which object to look into
//     console.log(`fetchWeatherData(): City Name: ${cityName}`);
//     // Get & build location info
//     let locName = city.properties.relativeLocation.properties.city;
//     let locState = city.properties.relativeLocation.properties.state;
//     let fullName = locName + ", " + locState; // Output
//     console.log(`fetchWeatherData(): fullName is: ${fullName}`);
    
//     // Get & build Lat + Long
//     let locLat = city.geometry.coordinates[0]; 
//     let locLong = city.geometry.coordinates[1];
//     let locCoords = locLat + ", " + locLong; // Output
//     console.log(`fetchWeatherData(): locCoords: ${locCoords}`);
    
//     // Store in local storage in a JSON file
//     const cityData = JSON.stringify({fullName,locCoords});
//     locStor.setItem(fullName, cityData); // Note: This can be edited by the client!!
//     console.log(`fetchWeatherData(): Successfully saved fullName to session storage: ${cityData}`);

//     // Temperature data
//     let temp = city.properties.relativeLocation.properties.temperature;
//     let lowTemp = city.properties.relativeLocation.properties.lowTemp;
//     let highTemp = city.properties.relativeLocation.properties.highTemp;

//     // Wind data
//     let windSpeed = city.properties.relativeLocation.properties.windSpeed;
//     let windGust = city.properties.relativeLocation.properties.windSpeed;

//     // Hourly data
//     getHourly(city.properties.forecastHourly);

//     // Store in session storage
//     sesStor.setItem("fullName", fullName);
//     sesStor.setItem("locCoords", locCoords);
//     sesStor.setItem("temp", temp);
//     sesStor.setItem("lowTemp", lowTemp);
//     sesStor.setItem("highTemp", highTemp);
//     sesStor.setItem("windSpeed", windSpeed);
//     sesStor.setItem("windGust", windGust);

//   })
//   .catch(function(error){
//     console.log("fetchWeatherData(): There was a fetch problem: ", error.message);
//     statusBox.innerHTML = "Sorry, the data could not be processed.";
//   })
// }

// Get hourly forecast data
function getHourly(URL) {
  fetch(URL, idHeader )
   .then(function (response) {
    if (response.ok) {
     return response.json();
    }
    throw new ERROR('Response not OK.');
   })
   .then(function (data) {
    // log result of fetch to console
    console.log('getHourly(): Data from getHourly function:');
    console.log(data); 
 
    // Store 12 hours of data to session storage  
    var hourData = [];
    let todayDate = new Date();
    var nowHour = todayDate.getHours();
    console.log(`getHourly(): nowHour is ${nowHour}`);
    for (let i = 0, x = 11; i <= x; i++) {
      // if time from nowHour < 24, store in the array at [i], otherwise, subtract 12 (hours) and then add to the array
      if (nowHour < 24) {
        hourData[nowHour] = data.properties.periods[i].temperature + "," + data.properties.periods[i].windSpeed + "," + data.properties.periods[i].icon;
        sesStor.setItem(`hour${nowHour}`, hourData[nowHour]);
      nowHour++;
      } else {
        nowHour = nowHour - 12;
        hourData[nowHour] = data.properties.periods[i].temperature + "," + data.properties.periods[i].windSpeed + "," + data.properties.periods[i].icon;
        sesStor.setItem(`hour${nowHour}`, hourData[nowHour]);
        nowHour = 1;
      }
    }
 
    // Get the shortForecast value from the first hour (the current hour)
    // This will be the condition keyword for setting the background image
    sesStor.setItem('shortForecast', data.properties.periods[0].shortForecast);
 
    // Call the buildPage function
    buildPage();
  })
  .catch(error => console.log('getHourly(): There was a getHourly error: ', error))
}

// Build the weather page
function buildPage(){
  let pageTitle = $("#page-title"); // Identify the title element
  console.log(`buildPage(): pageTitle: ${pageTitle}`);

  let fullNameNode = document.createTextNode(sesStor.getItem("fullName")); // get fullName from sesStor
  pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]); // put fullName before existing text in title
// set city name
  let contentHeading = $("#contentHeading");
  contentHeading.innerHTML = sesStor.getItem("fullName");
// set lat & long coords + elevation
  let latlong = $("#locCoords");
  latlong.innerHTML = sesStor.getItem("locCoords") + "<br><br>Elevation: " + sesStor.getItem("stationElevation") + "ft";

  changeSummaryBackground(sesStor.getItem("shortForecast")); // set background image

  // identify condition containers and set current conditions dynamically
  let highTemp = $(".high-temp");
  highTemp.innerHTML = sesStor.getItem("highTemp") + "&deg;";
  let lowTemp = $(".low-temp");
  lowTemp.innerHTML = sesStor.getItem("lowTemp") + "&deg;";
  let currTemp = $(".current-temp");
  currTemp.innerHTML = sesStor.getItem("temp") + "&deg;";
  let feelTemp = $("#wind-chill");
  feelTemp.innerHTML = buildWindChill(sesStor.getItem("windSpeed"), sesStor.getItem("temp"));
  let windSpeed = $(".wind");
  windSpeed.innerHTML = "Wind Speed: " + sesStor.getItem("windSpeed") + "mph";
  let windGust = $(".gusts");
  windGust.innerHTML = "Gusts: " + sesStor.getItem("windGust") + "mph";

  // Time indicators
  let thisDate = new Date();
  var currentHour = thisDate.getHours();
  console.log(`buildPage(): currentHour is: ${currentHour}`);
  let indicatorHour;
  // if hour is > 12, then - 12
  if (currentHour > 12){
    indicatorHour = currentHour - 12;
    console.log(`buildPage(): indicatorHour (after change) is: ${indicatorHour}`);
  } else {
    indicatorHour = currentHour;
    console.log(`buildPage(): indicatorHour (no change required) is: ${currentHour}`);
  };
  console.log(`buildPage(): Current hour in time indicator is ${currentHour}`);
  timeBall(indicatorHour); // set time indicator

  // Hourly temperature component
  let currentData = [];
  let tempHour = currentHour;

  for (let i = 0, x = 12; i < x; i++){
    if (tempHour <=23){
      currentData[i] = sesStor.getItem("hour" + tempHour).split(",");
      tempHour++;
    } else {
      tempHour = tempHour - 12;
      currentData[i] = sesStor.getItem("hour" + tempHour).split(",");
      console.log(`currentData[i][0] is: ${currentData[i][0]}`);
      tempHour = 1;
    }
  }
  console.log(currentData);

  // loop through array inserting data
  // match outer container at current time
  tempHour = currentHour; 
  for (let i = 0, x = 12; i < x; i++){
    if (tempHour >= 13){
      tempHour = tempHour - 12;
    }
    $(".temperature .outer" + tempHour).innerHTML = currentData[i][0] + "&deg;";
    tempHour++;
  }
  console.log("buildPage(): finished displaying hourly temperature data.");

  // Wind forecast component
let windArray = [];
let windHour = currentHour;

// Adjust for current time
for (let i = 0, x = 12; i < x; i++){
  if (windHour <= 23){
    windArray[i] = currentData[i][1].split(" ");
    windHour++;
  } else {
    windHour = windHour - 12;
    windArray[i] = currentData[i][1].split(" ");
    windHour = 1;
  }
}
console.log(windArray);

// Insert wind data according to matching container
windHour = currentHour; 
for (let i = 0, x = 12; i < x; i++){
  if (windHour >= 13){
    windHour = windHour - 12;
  }
  $(".wind-forecast .outer" + windHour).innerHTML = windArray[i][0];
  windHour++;
}
console.log("buildPage(): Finished displaying wind data")

// Condition component icons
let conditionHour = currentHour;

for (let i = 0, x = 12; i < x; i++){
  if (conditionHour >= 13){
    conditionHour = conditionHour - 12; 
  }
  $("#forecast .outer" + conditionHour).innerHTML = "<img src=\"" + currentData[i][2] + "\" alt=\"Hourly weather condition\">";
  // console.log(`Updated ${conditionHour} to ${currentData[i][2]}`);
  conditionHour++;
  
}

// Display the content
console.log("buildPage(): Content rendering complete. Showing document.")
mainContent.setAttribute("class", ""); // Remove .hide from #main-content
statusBox.setAttribute("class", "hide"); // Add .hide to statusBox

}

// gets location data from NWS API
function getLocation (locale) {
  const URL = "https://api.weather.gov/points/" + locale; // build url to request location from NWS API
  fetch(URL, idHeader)
  .then(function(response){
    if(response.ok){
      return response.json(); // return json file if ok
    }
    throw new Error("Response not OK.");
  })
  .then(function(data){
    console.log("getLocation(): JSON payload: ");
    console.log(data); 
    
    // store name and state in local storage
    let locName = data.properties.relativeLocation.properties.city;
    let locState = data.properties.relativeLocation.properties.state;
    let fullName = locName + ", " + locState;
    console.log(`getLocation(): Value of location: ${fullName}`);

    // Create info for localStorage
    let coords = sesStor.getItem("locCoords");
    let locationPayload = JSON.stringify({fullName,coords});
    locStor.setItem(fullName, locationPayload);

    // store fullName for build page use
    sesStor.setItem("fullName", fullName);
    // store forecastURL and forecastHourlyURL to session storage
    sesStor.setItem("forecastURL", data.properties.forecast);
    sesStor.setItem("forecastHourlyURL", data.properties.forecastHourly);

    // get weather station id
    let stationsURL = data.properties.observationStations;
    getStationId(stationsURL); // get the station ID from the URL
  })
  .catch (error => console.log("getLocation(): There was a getLocation() error: ", error)) // log errors to console
}

// Get the station ID by URL (obtained in getLocation())
function getStationId (stationsURL) {
  fetch(stationsURL, idHeader)
  .then(function(response){
    if(response.ok){
      return response.json();
    }
    throw new Error("Response not OK.");
  })
  .then(function (data){
    console.log(`getStationId(): JSON payload:`);
    console.log(data);
    // store station ID + elevation (converted to feet)
    let stationId = data.features[0].properties.stationIdentifier;
    let stationElevation = metersToFeet(data.features[0].properties.elevation.value);
    console.log(`getStationId(): Station and Elevation are: ${stationId} ${stationElevation}`);
    // store to localstorage
    locStor.setItem("stationId", stationId);
    sesStor.setItem("stationElevation", stationElevation);
    
    // get weather for this station
    getWeather(stationId);
  })
  .catch(error => console.log("getStationId(): There was a getStationId() error: ", error));
}

// Get weather based on station ID
function getWeather(stationId) { 
  // This is the URL for current observation data 
  const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
  fetch(URL, idHeader) 
  .then(function(response){
    if(response.ok){ 
     return response.json(); 
    } 
    throw new ERROR("Response not OK.");
  })
  .then(function (data) { 
    console.log('From getWeather() function:'); 
    console.log(data);
  
    // Store current weather information to sessionStorage 
    // get temp, log & store to session storage
    let temp = celsiusToFahrenheit(data.properties.temperature.value);
    console.log(`getWeather(): The value of temp is: ${temp}`);
    sesStor.setItem("temp", temp);
    // get windspeed, log & store to session storage
    let windSpeed = metersPerSecondToMph(data.properties.windSpeed.value);
    console.log(`getWeather(): the value of windSpeed is: ${windSpeed}`);
    sesStor.setItem("windSpeed", windSpeed);
    // get wind gust speed, log & store to session storage
    let windGust = metersPerSecondToMph(data.properties.windGust.value);
    console.log(`getWeather(): the value of windGust is: ${windGust}`);
    sesStor.setItem("windGust", windGust);

    // Call the getForecast function
    getForecast(sesStor.getItem("forecastURL"));
    // Call the getHourly function
    getHourly(sesStor.getItem("forecastHourlyURL"));
   }) 
  .catch(error => console.log('getWeather(): There was a getWeather() error: ', error)) 
 }

 function getForecast(URL) {
  fetch(URL, idHeader)
  .then(function(response){
    if(response.ok){
      return response.json();
    }
    throw new ERROR("Response not OK.")
  })
  .then(function (data) {
    console.log("getForecast(): From getForecast function:");
    console.log(data); // log data returned from NWS API

    // Extract & store highTemp
    let highTemp = data.properties.periods[0].temperature;
    console.log(`getForecast(): Value of highTemp is: ${highTemp}`);
    sesStor.setItem("highTemp", highTemp);

    // Extract & store lowTemp
    let lowTemp = data.properties.periods[1].temperature;
    console.log(`getForecast(): Value of lowTemp is: ${lowTemp}`);
    sesStor.setItem("lowTemp", lowTemp);

  })
 }

 // converts meters to feet
function metersToFeet(meters) {
  return (meters * 3.281).toFixed(0);
}

// converts celsius to fahrenheit
function celsiusToFahrenheit(celsiusTemp) {
  return ((celsiusTemp * 9/5) + 32).toFixed(0);
}

// converts meters/sec to miles/hour
function metersPerSecondToMph (speed) {
  return (speed / 2.237).toFixed(1);
}