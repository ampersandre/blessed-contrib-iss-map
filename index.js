const blessed = require('blessed');
const axios = require('axios');
const contrib = require('blessed-contrib');

const ISS_LOCATION_ENDPOINT = 'http://api.open-notify.org/iss-now.json';

const screen = blessed.screen();
const map = contrib.map({ label: '' });


const issState = {
  lat: '0',
  lng: '0',
};
let showMarker = true;


screen.append(map);
screen.render();

function updateLocation() {
  axios.get(ISS_LOCATION_ENDPOINT).then((response) => {
    const { latitude, longitude } = response.data.iss_position;
    issState.lat = latitude;
    issState.lng = longitude;
  });
}

updateLocation();
setInterval(updateLocation, 15000);


function refreshMarker() {
  showMarker = !showMarker;
  map.clearMarkers();
  if (showMarker) {
      map.addMarker({
        lat: issState.lat,
        lon: issState.lng,
        color: 'blue',
        char: '፨' });
  }
  screen.render();
}

refreshMarker();
setInterval(refreshMarker, 500);