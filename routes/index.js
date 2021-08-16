const express = require("express")
const router = express.Router()
const citiesController = require("../controllers/citiesController")

router
  .route("/cities")
  .get(citiesController.getCities)
  .post(citiesController.addCity)

router
  .route("/city/:id")
  .get(citiesController.getCity)
  .delete(citiesController.deleteCity)
  .put(citiesController.updateCity)

module.exports = router
