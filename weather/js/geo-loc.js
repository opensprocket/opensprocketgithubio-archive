// Gets geolocation
function getGeoLocation() {
  const status = $("#status");
  status.innerHTML = "Getting Location...";
  // Check if geolocation API is supported
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const locale = lat + "," + long; // combine into locale
      console.log(`getGeoLocation(): Lat and Long are ${locale}`); 
      getLocation(locale); // get location
    })
  } else {
    status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!"
  }
}