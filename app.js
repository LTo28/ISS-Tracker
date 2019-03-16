let marker, tracker, map

function initMap() {
  var uluru = { lat: -25.344, lng: 131.036 };
  map = new google.maps.Map(document.getElementById('map'), { zoom: 4, center: uluru });
  marker = new google.maps.Marker({ position: uluru, map: map });
}

const trackMovement = () => {
  fetch('http://api.open-notify.org/iss-now.json')
    .then(r => r.json())
    .then(response => {
      const { latitude, longitude } = response.iss_position
      marker.setPosition({
        lat: parseInt(latitude),
        lng: parseInt(longitude)
      })
      map.panTo({
        lat: parseInt(latitude),
        lng: parseInt(longitude)
      })
    })
    .catch(e => console.error(e))
}

function startTracking() {
  tracker = setInterval(trackMovement, 2000)
}

function stopTracking() {
  clearInterval(tracker)
}
