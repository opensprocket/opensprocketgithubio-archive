"use strict";

console.log("Loaded functions.js successfully.");

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var locStor = window.localStorage;
var sesStor = window.sessionStorage;
var pageNav = $("#page-nav");

var reservationForm = $("#reservation-form-container");
var reservationStatus = $("#reservation-status");
var reservationConfirmation = $("#reservation-confirmation");
var collapsibleElement = $$(".collapsible")

// DOM event listner
document.addEventListener("DOMContentLoaded", function(){

  //functions to run go here!
  lastModified();
  copyrightYear();

});

$("#reservation-form").addEventListener('submit', function(event){event.preventDefault();});



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

function processReservationData() {
  let reservation = {
    location: $("#res-location").value,
    checkInDate: $("#res-check-in-date").value,
    checkOutDate: $("#res-check-out-date").value,
    roomType: $("#res-room-type").value,
    numberOfRooms: $("#res-num-of-rooms").value,
    firstName: $("#res-first-name").value,
    lastName: $("#res-last-name").value,
    emailAddress: $("#res-email-address").value,
    phoneNumber: $("#res-phone-number").value,
    country: $("#res-country").value,
    state: $("#res-state").value
  }
  console.log(`Value of reservation object:`);
  console.log(reservation);

  sesStor.setItem("reservation", JSON.stringify(reservation)); // store to session storage
  // document.forms[0].reset; // reset form
  // console.log("Reset form");

  reservationForm.classList.add("hide");
  reservationStatus.classList.remove("hide");
  console.log("Hid reservation form, showed status box");

  buildReservationConfirmation();
}

function buildReservationConfirmation() {
  let reservation = JSON.parse(sesStor.getItem("reservation"));
  console.log("Value of JSON parsed from session storage: ");
  console.log(reservation);

  // build confirmation
  let reservedRoomType;
  switch (reservation.roomType) {
    case "bed1":
      reservedRoomType = "One King Bed, Regular room";
      break;
    case "bed2":
      reservedRoomType = "Two Queen Beds, Regular room";
      break;
    case "suite1":
      reservedRoomType = "One Queen Bed, Suite with Kitchenette";
      break;
    case "suite2":
      reservedRoomType = "One King Bed, Suite with Kitchenette";
      break;
  }
  console.log(`Reserved room type: ${reservedRoomType}`);

  $("#conf-name").innerHTML = "Name: " + reservation.firstName + " " + reservation.lastName;
  $("#conf-email-address").innerHTML = "Email Address: " + reservation.emailAddress;
  $("#conf-phone-number").innerHTML = "Phone Number: " + reservation.phoneNumber;
  $("#conf-country-state").innerHTML = "Country and State: " + reservation.state + ", " + reservation.country;
  $("#conf-location").innerHTML = "Hotel Location: " + reservation.location;
  $("#conf-check-in").innerHTML = "Check-in Date: " + reservation.checkInDate;
  $("#conf-check-out").innerHTML ="Check-out Date: " + reservation.checkOutDate;
  $("#conf-room-type").innerHTML = "Room type: " + reservedRoomType;
  $("#conf-number-of-rooms").innerHTML = "Number of Rooms: " + reservation.numberOfRooms;

  console.log("Set value of reservation confirmation");

  reservationStatus.classList.add("hide");
  reservationConfirmation.classList.remove("hide");

  console.log("Hid reservation status, showing confirmation.");

}

function toggleCollapsible() {

}