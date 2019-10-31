'use strict';

//
// Weather Site JS Functions
//
console.log("Loaded functions.js successfully!")

// $ = document.querySelector();
// $$ = document.querySelectorAll();

// DOM event Listener
document.addEventListener("DOMContentLoaded", function(){
lastModified(); // builds and displays last modified date
copyrightYear();  // builds and displays copyright year
// event listener for mobile menu
const menuButton = document.querySelector("#menuBtn");
menuButton.addEventListener("click", toggleMobileMenu);
});

// Last modified date
function lastModified() {
  const longDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const longMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let lastMod = new Date(document.lastModified);
  const dayName = longDayNames[lastMod.getDay()];
  const monthName = longMonthNames[lastMod.getMonth()];
  const formattedDate = "Updated: " + dayName + ", " + lastMod.getDate() + " " + monthName + " " + lastMod.getFullYear();
  document.querySelector("#last-modified").innerText = formattedDate;
  console.log("Successfully built last modified date");
}
// Copyright date
function copyrightYear() {
  const currYear = new Date();
  const copyOutput =  "&copy; " + currYear.getFullYear() + " ";
  document.querySelector("#copyright-year").innerHTML = copyOutput;
  console.log("Successfully built the copyright year");
}
// Mobile menu toggle

function toggleMobileMenu(event) {
  const navList = document.querySelector(".navigation");
  navList.classList.toggle("responsive");
}