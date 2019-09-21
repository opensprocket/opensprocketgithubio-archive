//input: page load
//operation: get date, parse and save date. get last modified, save
//output: display after page load
function onPageLoad () {
    //update copyright date
    var todaysDate = new Date();
    var currentYear = todaysDate.getFullYear();
    document.getElementById('copyright-year').innerHTML = currentYear;
    //get document.lastmodified
    var lastModifiedDate = document.lastModified; 
    document.getElementById('lastupdated').innerHTML = lastModifiedDate;
}
//calls funciton after page has loaded
window.onload = onPageLoad();