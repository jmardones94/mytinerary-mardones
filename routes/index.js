const express = require('express')
const router = express.Router()
const citiesController = require('../controllers/citiesController')

router
    .route('/cities')
    .get(citiesController.getCities)

router
    .route('/city/:id')
    .get(citiesController.getCityById)

module.exports = router