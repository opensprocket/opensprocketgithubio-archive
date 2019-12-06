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
  buildPageTitle();

});

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

function buildPageTitle(){
  let pageTitle = $("#page-title");
  let currentPage = pageTitle.getAttribute("data-currentpage");
  if (!currentPage){
    return;
  }
  let title;
  switch (currentPage) {
    case "home":
      title = "Home";
      break;
    case "attributions":
      title = "Attributions";
      break;
    case "contact":
      title = "Contact"
      break;
    case "reservations":
      title = "Reservations";
      break;
    case "services":
      title = "Services";
      break;
    case "temples":
      title = "Temples";
      break;
    default:
      title = "New Page";
      break;
  }
  let fullNameNode = document.createTextNode(title);
  pageTitle.insertBefore(fullNameNode,pageTitle.childNodes[0]);
  console.log(`buildPageTitle: Successfully built page title to: ${title}`);
}