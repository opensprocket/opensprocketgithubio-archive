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

// Values for buildWindChill 
let temp = 31;
let speed = 5;
buildWindChill(speed, temp); // calculate and display feels like temperature

});

// Last modified date
function lastModified() {
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
function copyrightYear() {
  const currYear = new Date(); // new date
  const copyOutput =  "&copy; " + currYear.getFullYear() + " "; // build inner html content
  document.querySelector("#copyright-year").innerHTML = copyOutput; // set inner html content
  console.log("Successfully built the copyright year");
}

// Mobile menu toggle
function toggleMobileMenu(event) {
  const navList = document.querySelector(".navigation"); // grab the first element with the class of navigation (ul in the nav section)
  navList.classList.toggle("responsive"); // toggle the class which affects the visibility of the menu
}

// Calculate the wind chill
function buildWindChill(speed, temp) {
  let feelTemp = document.getElementById("wind-chill"); // grab the span used to hold the wc
  let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16); // quik maffs (for a computer)
  console.log(`The wind chill is: ${wc}`); // log wc to console
  wc = Math.floor(wc); // round down to the nearest int
  wc = (wc > temp) ? temp:wc; // if chill > temp, return temp
  console.log(`The wind chill is: ${wc}`); // log wc to console
  feelTemp.innerHTML = wc; // output wc to page
}



// TODO build setCurrTemp
// TODO build setLowTemp
// TODO build setHighTemp
// TODO build setCurrWindSpd
// TODO build setCurrGustSpd

