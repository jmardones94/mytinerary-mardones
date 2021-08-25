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
router.route("/user/login").post(usersController.logIn)

router.route("/users").get(usersController.getUsers)

router
  .route("/user/:id")
  .get(usersController.getUserById)
  .delete(usersController.deleteUser)
  .put(usersController.updateUser)

router.route("/admin/:id").post(usersController.setAdmin)

module.exports = router
