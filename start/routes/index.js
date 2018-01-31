
const express = require('express');
const router = express.Router();

const { db, Place, Hotel, Activity, Restaurant } = require('../models');

// router.get('/', function (req, res, next){
//   // res.send('../views/index.html');
//   res.send('stuff and stuff');
// });

router.get('/api', function (req, res, next){
  let hotels = Hotel.findAll({include: [Place]});
  let restaurants = Restaurant.findAll({include: [Place]});
  let activities = Activity.findAll({include: [Place]});

  Promise.all([hotels, restaurants, activities])
  .then((values) => {
    res.json(values);
  }).catch(next);
});

router.get('/api/hotels', (req, res, next) => {
  Hotel.findAll({include: [Place]})
  .then(values => res.json(values))
  .catch(next);
});

router.get('/api/restaurants', (req, res, next) => {
  Restaurant.findAll({include: [Place]})
  .then(values => res.json(values))
  .catch(next);
});

router.get('/api/activities', (req, res, next) => {
  Activity.findAll({include: [Place]})
  .then(values => res.json(values))
  .catch(next);
});


module.exports = router;
