const Itinerary = require("../models/Itinerary")

const itinerariesController = {
  getAllItineraries: async (req, res) => {
    try {
      const itineraries = await Itinerary.find()
      res.json({ success: true, response: itineraries, error: null })
    } catch (e) {
      res.json({
        success: false,
        response: "We couldn't get the itineraries.",
        error: e.message,
      })
    }
  },
  getItineraryById: async (req, res) => {
    try {
      const itinerary = await Itinerary.findOne({ _id: req.params.id })
      res.json({ success: true, response: itinerary, error: null })
    } catch (e) {
      res.json({
        success: false,
        response: "We couldn't get the itinerary with this id.",
        error: e.message,
      })
    }
  },
  getItinerariesByCityId: async (req, res) => {
    try {
      const itineraries = await Itinerary.find({ cityId: req.params.id })
      res.json({ success: true, response: itineraries, error: null })
    } catch (e) {
      res.json({ success: false, response: "Error.", error: e.message })
    }
  },
  addItinerary: async (req, res) => {
    try {
      const newItinerary = new Itinerary({ ...req.body })
      await newItinerary.save()
      res.json({ success: true, response: newItinerary, error: null })
    } catch (e) {
      res.json({
        success: false,
        response: "We couldn't add the itinerary.",
        error: e.message,
      })
    }
  },
  deleteItinerary: async (req, res) => {
    try {
      await Itinerary.findOneAndDelete({ _id: req.params.id })
      res.json({ success: true, response: "Itinerary deleted.", error: null })
    } catch (e) {
      res.json({
        success: false,
        response: "We couldn't get the itineraries.",
        error: e.message,
      })
    }
  },
  updateItinerary: async (req, res) => {
    try {
      const itineraryUpdated = await Itinerary.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
      )
      res.json({ success: true, response: itineraryUpdated, error: null })
    } catch (e) {
      res.json({
        success: false,
        response: "We couldn't update the itinerary with this id.",
        error: e.message,
      })
    }
  },
  addLike: async (req, res) => {
    try {
      const { itineraryId } = req.body
      const itinerary = await Itinerary.findOneAndUpdate(
        { _id: itineraryId },
        { $addToSet: { likes: req.user._id } },
        { new: true }
      )
      res.json({ success: true, response: itinerary, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  removeLike: async (req, res) => {
    try {
      const { itineraryId } = req.body
      const itinerary = await Itinerary.findOneAndUpdate(
        { _id: itineraryId },
        { $pull: { likes: req.user._id } },
        { new: true }
      )
      res.json({ success: true, response: itinerary, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getUserFavorites: async (req, res) => {
    try {
      const { _id } = req.user
      const itineraries = await Itinerary.find({ likes: _id })
      res.json({ success: true, response: itineraries, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
}

module.exports = itinerariesController
