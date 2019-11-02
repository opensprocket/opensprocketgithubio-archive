'use strict'; // use ES6 

//
// Weather Site JS Functions
//

console.log("Loaded functions.js successfully!"); // log the load of the script to console

// $ = document.querySelector();
// $$ = document.querySelectorAll();

// DOM event Listener
document.addEventListener("DOMContentLoaded", function(){
lastModified(); // builds and displays last modified date
copyrightYear();  // builds and displays copyright year

// event listener for mobile menu
const menuButton = document.querySelector("#menuBtn"); // select menu button
menuButton.addEventListener("click", toggleMobileMenu); // add event listener to menu button and call function on click

// Values for buildWindChill()
let temp = 31;
let speed = 5;
buildWindChill(speed, temp); // calculate and display feels like temperature

// Values for timeBall()
let hour = "11";
timeBall(hour);

// Values for changeSummaryBackground
let currCond = "raiN";
changeSummaryBackground(currCond);

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
  console.log("Successfully built last modified date");
}

// Copyright date
function copyrightYear(){
  const currYear = new Date(); // new date
  const copyOutput =  "&copy; " + currYear.getFullYear() + " "; // build inner html content
  document.querySelector("#copyright-year").innerHTML = copyOutput; // set inner html content
  console.log("Successfully built the copyright year");
}

// Mobile menu toggle
function toggleMobileMenu(event){
  const navList = document.querySelector(".navigation"); // grab the first element with the class of navigation (ul in the nav section)
  navList.classList.toggle("responsive"); // toggle the class which affects the visibility of the menu
}

// Calculate the wind chill
function buildWindChill(speed, temp){
  let feelTemp = document.getElementById("wind-chill"); // grab the span used to hold the wc
  let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16); // quik maffs (for a computer)
  console.log(`The wind chill is: ${wc}`); // log wc to console
  wc = Math.floor(wc); // round down to the nearest int
  wc = (wc > temp) ? temp:wc; // if chill > temp, return temp
  console.log(`The wind chill is: ${wc}`); // log wc to console
  feelTemp.innerHTML = wc; // output wc to page
}

// Time ball indicator
function timeBall(hour){
  let x = document.querySelectorAll(".ball");
  let hr = "b" + hour;
  console.log(`Value of hour: ${hour}`);
  for (let item of x){
    item.classList.add(hr)
  }
}

// Summary background image switching
function changeSummaryBackground(currCond){
  console.log(`Value of currCond: ${currCond}`);
  let condition = (currCond.toLowerCase()).trim(); // standardize input
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

  // update condition index based on weather status
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
      console.log("Error: Weather type is invalid.")
      break;
  }
  console.log(`Value of conditionIndex: ${conditionIndex}`);
  
  // build image url() CSS variable
  let imageURL = imgDirPrefix + imgURLS[conditionIndex] + imgDirPostfix;
  console.log(`imageURL is: ${imageURL}`);

  // set background image
  const backgroundImg = document.body.style; // used to access css
  // console.log(`backgroundImg: ${backgroundImg}`);
  backgroundImg.setProperty("--dynamic-weather-background", `${imageURL}`); 
  console.log(`${imageURL} has been set as the background.`);
}


// TODO build setCurrTemp
// TODO build setLowTemp
// TODO build setHighTemp
// TODO build setCurrWindSpd
// TODO build setCurrGustSpd

