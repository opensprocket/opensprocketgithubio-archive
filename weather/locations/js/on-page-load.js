//prints current date (day name, day  month, year)
function currentDate() {
    var todaysDate = new Date();
    const longDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dayName = longDayNames[todaysDate.getDay()];
    const longMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthName = longMonthNames[todaysDate.getMonth()];
    document.getElementById("current-date").innerHTML = dayName + ", " + todaysDate.getDate() + " " + monthName + " " + todaysDate.getFullYear();
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