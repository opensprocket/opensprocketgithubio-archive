"use strict";

// Global Variables
// var localStorage = window.localStorage;
// var sessionStorage = window.sessionStorage;
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

// Event Listener
document.addEventListener("DOMContentLoaded", function(){
  //Functions to run
  buildLastModified("#last-modified");
  buildCopyrightDate("#copyright-year");
  getCurrentDate();
  getCurrentDate();

})

function buildLastModified(containerId) {
  const container = $(containerId);
  const longDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const longMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let lastMod = new Date(document.lastModified);
  const dayName = longDayNames[lastMod.getDay()];
  const monthName = longMonthNames[lastMod.getMonth()];
  const formattedDate = "Updated: " + lastMod.getDate() + " " + monthName + " " + lastMod.getFullYear();
  container.innerText = formattedDate;
}

function buildCopyrightDate(containerId) {
  const container = $(containerId);
  const currYear = new Date();
  const copyOutput =  "&copy; " + currYear.getFullYear();
  container.innerHTML = copyOutput;
}

function getCurrentDate() {
    
}

function getCurrentTime() {
    
}