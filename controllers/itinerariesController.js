const Itinerary = require("../models/Itinerary")

const itinerariesController = {
  getItineraries: async (req, res) => {
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
  getItinerary: async (req, res) => {
    try {
      const itinerary = await Itinerary.findOne({ _id: req.params.id })
      if (!itinerary) {
        throw new Error("This itinerary doesn't exists.")
      }
      res.json({ success: true, response: itinerary, error: null })
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
}

module.exports = itinerariesController
