mapboxgl.accessToken = 'pk.eyJ1Ijoic2dyaWNoZW5zIiwiYSI6ImNsZGNlZXUyazA5YjUzcHA2ejhuaTBld3YifQ.dtar1LhXriGs-PkHHHq5yg';
let destination;
let destRetrievedEl = document.getElementById('destination-retrieved');
let destInputEl = document.getElementById('dest-input');
let destTextEl = document.getElementById('dest-text');
//add above ids to html along with mapbox script


let map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-89.384, 43.101],
  zoom: 5
});



let to = [-89.384, 43.101] //lng, lat
let from = [-87.627, 41.919]  //lng, lat 

let greenMarker = new mapboxgl.Marker({
    color: 'green'
  })
  .setLngLat(to) // marker position using variable 'to'
  .addTo(map); //add marker to map

let purpleMarker = new mapboxgl.Marker({
    color: 'purple'
  })
  .setLngLat(from) // marker position using variable 'from'
  .addTo(map); //add marker to map

let options = {
  units: 'miles'
}; // units can be degrees, radians, miles, or kilometers, just be sure to change the units in the text box to match. 

let distance = turf.distance(to, from, options);

let value = document.getElementById('map-overlay')
value.innerHTML = "Distance: " + distance.toFixed([2]) + " miles"


destInputEl.addEventListener('submit', formSubmitCity)

function formSubmitCity (event) {
  event.preventDefault();
     
  destination = destTextEl.value.trim();  
  console.log(destination);
  destRetrievedEl.classList.remove('hidden');

};