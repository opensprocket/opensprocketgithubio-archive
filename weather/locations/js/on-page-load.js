//prints current date (day name, day  month, year)
function currentDate() {
    var options = { weekday: "long", year: "numeric", month: "long", day: "numeric", };
    var todaysDate = new Date();
    document.getElementById("current-date").innerHTML = todaysDate.toLocaleDateString("en-US", options);
}
//gets the curreent year and displays the copyright info
function copyrightYear() {
    var todaysDate = new Date();
    var currentYear = todaysDate.getFullYear();
    document.getElementById('copyright-year').innerHTML = "&copy; " + currentYear;
}

//calls the listed funciton after page has loaded
window.onload = currentDate();
window.onload = copyrightYear();

//toggles the mobile hamburger menu open and closed
function toggleMenu() {
    document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
}