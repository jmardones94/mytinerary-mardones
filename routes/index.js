const express = require("express")
const router = express.Router()
const citiesController = require("../controllers/citiesController")
const itinerariesController = require("../controllers/itinerariesController")
const activitiesController = require("../controllers/activitiesController")
const usersController = require("../controllers/usersController")
const passport = require("passport")
const validator = require("../controllers/validator")
const isAdmin = require("../controllers/isAdmin")
const commentsController = require("../controllers/commentsController")

// CITIES ROUTES
router
  .route("/cities")
  .get(citiesController.getCities)
  .post(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    citiesController.addCity
  )

router
  .route("/city/:id")
  .get(citiesController.getCity)
  .delete(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    citiesController.deleteCity
  )
  .put(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    citiesController.updateCity
  )

// ITINERARIES ROUTES
router
  .route("/itineraries")
  .get(itinerariesController.getAllItineraries)
  .post(itinerariesController.addItinerary)

router
  .route("/itineraries/user")
  .get(
    passport.authenticate("jwt", { session: false }),
    itinerariesController.getUserFavorites
  )

router
  .route("/itineraries/:id")
  .get(itinerariesController.getItinerariesByCityId)

router
  .route("/itinerary/like")
  .put(
    passport.authenticate("jwt", { session: false }),
    itinerariesController.addLike
  )
router
  .route("/itinerary/dislike")
  .put(
    passport.authenticate("jwt", { session: false }),
    itinerariesController.removeLike
  )

router
  .route("/itinerary/comments/:itineraryId")
  .get(commentsController.getComments)
  .post(
    passport.authenticate("jwt", { session: false }),
    commentsController.addComment
  )
router
  .route("/itinerary/comment/:commentId")
  .put(
    passport.authenticate("jwt", { session: false }),
    commentsController.updateComment
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    commentsController.removeComment
  )

router
  .route("/itinerary/activity/:itineraryId") //
  .get(activitiesController.getActivitiesByItineraryId)
  .post(activitiesController.addActivity)

router
  .route("/activity/:id")
  .get(activitiesController.getActivityById)
  .put(activitiesController.updateActivity)
  .delete(activitiesController.deleteActivity)

router
  .route("/itinerary/:id")
  .get(itinerariesController.getItineraryById)
  .delete(itinerariesController.deleteItinerary)
  .put(itinerariesController.updateItinerary)

// USER ROUTES

router.route("/user/signup").post(validator, usersController.createUser)
router.route("/user/login").post(usersController.logIn)

router
  .route("/user")
  .delete(
    passport.authenticate("jwt", { session: false }),
    usersController.deleteUser
  )
  .put(
    passport.authenticate("jwt", { session: false }),
    usersController.updateUser
  )

router.route("/admin/:id").post(usersController.setAdmin)

router
  .route("/validate/token")
  .get(
    passport.authenticate("jwt", { session: false }),
    usersController.tokenValidation
  )
router
  .route("/validate/admin")
  .get(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    usersController.adminValidation
  )

module.exports = router
