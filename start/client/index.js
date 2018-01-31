const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = "pk.eyJ1IjoicnhldCIsImEiOiJjamQxdmxyMjkyaTd3MnhvMTJtYm1haWptIn0.Li6AR9rxPNrk4BBNHIDdww";

const fullstackCoords = [-74.009, 40.705] // NY
// const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const map = new mapboxgl.Map({
  container: "map",
  center: fullstackCoords, // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const hotelLocations = [];
fetch('/api/hotels')
  .then(res => res.json())
  .then(hotels => hotels.forEach( hotel => {
    const option = document.createElement('option')
    const select = document.getElementById('hotels-choices')
    option.innerText = hotel.name;
    option.value = hotel.id;
    hotelLocations.push(hotel.place.location);

    select.appendChild(option);
  }))
  .catch(console.error);

const restaurantLocations = [];
fetch('/api/restaurants')
  .then(res => res.json())
  .then(restaurants => restaurants.forEach( restaurants => {
    const option = document.createElement('option')
    const select = document.getElementById('restaurants-choices')
    option.innerText = restaurants.name;
    option.value = restaurants.id;
    restaurantLocations.push(restaurants.place.location);
    // console.log(locations);
    select.appendChild(option);
  }))
  .catch(console.error);

  const activityLocations = [];
  fetch('/api/activities')
  .then(res => res.json())
  .then(activities => activities.forEach( activities => {
    const option = document.createElement('option')
    const select = document.getElementById('activities-choices')
    option.innerText = activities.name;
    option.value = activities.id;
    activityLocations.push(activities.place.location);
    select.appendChild(option);
  }))
  .catch(console.error);


  // LOCATIONS ARE CURRENTLY OFF BY ONE IN ARRAY

  const addHotel = document.getElementById('hotels-add');
  // console.log(addHotel);
  addHotel.onclick = function(){
    let sel = document.getElementById('hotels-choices');
    let cur = sel.options[sel.selectedIndex]
    let curId = cur.value;
    let list = document.getElementById('hotels-list');
    let newAct = document.createElement('li');
    newAct.innerText = cur.text;
    list.appendChild(newAct);
    let coords = (hotelLocations[curId+1]);
    const newMarker = buildMarker('hotels', coords);
    newMarker.addTo(map);
  };

  const addRestaurant = document.getElementById('restaurants-add');
  addRestaurant.onclick = function(){
    let sel = document.getElementById('restaurants-choices');
    let cur = sel.options[sel.selectedIndex]
    let curId = cur.value;
    let list = document.getElementById('restaurants-list');
    let newAct = document.createElement('li');
    newAct.innerText = cur.text;
    list.appendChild(newAct);
    let coords = (restaurantLocations[curId+1]);
    const newMarker = buildMarker('restaurants', coords);
    newMarker.addTo(map);
  };

  const addActivity = document.getElementById('activities-add');
  addActivity.onclick = function(){
    let sel = document.getElementById('activities-choices');
    let cur = sel.options[sel.selectedIndex]
    let curId = cur.value;
    let list = document.getElementById('activities-list');
    let newAct = document.createElement('li');
    newAct.innerText = cur.text;
    list.appendChild(newAct);
    let coords = (activityLocations[curId+1]);
    const newMarker = buildMarker('activities', coords);
    newMarker.addTo(map);
  };

const marker = buildMarker("activities", fullstackCoords);
marker.addTo(map);

