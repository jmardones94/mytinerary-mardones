const express = require("express")
const router = express.Router()
const citiesController = require("../controllers/citiesController")
const itinerariesController = require("../controllers/itinerariesController")

router
  .route("/cities")
  .get(citiesController.getCities)
  .post(citiesController.addCity)

router
  .route("/city/:id")
  .get(citiesController.getCity)
  .delete(citiesController.deleteCity)
  .put(citiesController.updateCity)

router
  .route("/itineraries")
  .get(itinerariesController.getItineraries)
  .post(itinerariesController.addItinerary)

router
  .route("/itinerary/:id")
  .get(itinerariesController.getItinerary)
  .delete(itinerariesController.deleteItinerary)

module.exports = router
