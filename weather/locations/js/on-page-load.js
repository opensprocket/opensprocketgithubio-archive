function onPageLoad() {
    //update copyright date
    var todaysDate = new Date();
    var currentYear = todaysDate.getFullYear();
    document.getElementById('copyright-year').innerHTML = currentYear;
    //get document.lastmodified
    document.getElementById('lastupdated').innerHTML = "Last updated: " + document.lastModified;
}
//calls funciton after page has loaded
window.onload = onPageLoad();

//toggles the mobile hamburger menu open and closed
function toggleMenu() {
    document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
}