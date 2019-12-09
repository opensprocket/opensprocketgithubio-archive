"use strict";

console.log("Loaded functions.js successfully.");

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var locStor = window.localStorage;
var sesStor = window.sessionStorage;
var pageNav = $("#page-nav");

// DOM event listner
document.addEventListener("DOMContentLoaded", function(){

  //functions to run go here!
  lastModified();
  copyrightYear();

});

// Add event listener to reservation page (only reservation page)
if ($("#page-title").getAttribute("data-currentpage") == "reservations") {
  // console.log(`Reservation page detection working! ${$("#page-title").getAttribute("data-currentpage")}`);
  document.addEventListener("DOMContentLoaded", ()=>{
    $("#submit").addEventListener("click", processData);
  })
}


function lastModified(){
  const longDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // full day name array
  const longMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // full month name array
  let lastMod = new Date(document.lastModified); // date prototype
  const dayName = longDayNames[lastMod.getDay()]; // get day name
  const monthName = longMonthNames[lastMod.getMonth()]; // get month name
  const formattedDate = "Updated: " + dayName + ", " + lastMod.getDate() + " " + monthName + " " + lastMod.getFullYear(); // build inner html output
  document.querySelector("#last-modified").innerText = formattedDate; // set inner html content
  console.log("lastModified(): Successfully built & displayed last modified date");
}

function copyrightYear(){
  const currYear = new Date(); // new date
  const copyOutput =  "&copy; " + currYear.getFullYear() + " "; // build inner html content
  document.querySelector("#copyright-year").innerHTML = copyOutput; // set inner html content
  console.log("copyrightYear(): Successfully built the copyright year");
}

function toggleMobileNav(){
  const navList = $("#navigation");
  const menuBtn = $("#menuBtn");
  navList.classList.toggle("responsive");
  menuBtn.classList.toggle("nav-active");
}

function getContactFormData() {
  let fullName = $("#full-name");
  let emailAddress = $("#email-address");
  let subject = $("#subject");
  let message = $("#message");
  sesStor.setItem("contact-fullName", fullName.value);
  sesStor.setItem("contact-emailAddress", emailAddress.value);
  sesStor.setItem("contact-subject", subject.value);
  sesStor.setItem("contact-message", message.value);
  console.log(`getContactFormData(): Successfully stored the contact form data into session storage.`);
}

let reservations = [];
let processData = (event) => {
  // stop the form from submitting
  event.preventDefault();
  let reservation = {
  guests: document.querySelector('#guests').value,
  resDate: document.querySelector('#resDate').value
  }

  // adds reservation to the end of the array of all reservations
reservations.push(reservation);

// reset the first, and only, form
document.forms[0].reset;

// see results in console
console.log('newRes', {reservations});

// Store to session Storage
window.sessionStorage.setItem("reservations", JSON.stringify(reservations));

// Retrieve from session storage
let resList = JSON.parse(window.sessionStorage.getItem("reservations"));
console.log(resList);

// inject to the page
const resDetails = document.querySelector("#resResult pre");
resDetails.textContent = "\n" + JSON.stringify(reservations, "\t", 2);

// display the results
document.querySelector("#resResult").classList.remove("hide");

}