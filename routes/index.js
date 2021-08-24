const express = require("express")
const router = express.Router()
const citiesController = require("../controllers/citiesController")
const itinerariesController = require("../controllers/itinerariesController")
const usersController = require("../controllers/usersController")

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
  .get(itinerariesController.getAllItineraries)
  .post(itinerariesController.addItinerary)

router
  .route("/itineraries/:id")
  .get(itinerariesController.getItinerariesByCityId)

router
  .route("/itinerary/:id")
  .get(itinerariesController.getItineraryById)
  .delete(itinerariesController.deleteItinerary)
  .put(itinerariesController.updateItinerary)

router.route("/user/signup").post(usersController.createUser)

module.exports = router
