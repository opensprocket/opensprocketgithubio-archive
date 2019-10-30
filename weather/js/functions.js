'use strict';

//
// Weather Site JS Functions
//

document.addEventListener("DOMContentLoaded", function(){

})

// Last modified date
function lastModified() {
  const longDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const longMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let lastMod = new Date(document.lastModified);
  const dayName = longDayNames[lastMod.getDay()];
  const monthName = longMonthNames[lastMod.getMonth()];
  const formattedDate = "Updated: " + dayName + ", " + lastMod.getDate() + " " + monthName + " " + lastMod.getFullYear();
  document.querySelector("#last-modified").innerHTML = formattedDate;
}

// Collapsible Mobile Menu
function toggleMenu() {
  document.querySelectorAll("navigation")[0].classList.toggle("responsive");
}