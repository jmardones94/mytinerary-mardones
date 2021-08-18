const mongoose = require("mongoose")

const itinerarySchema = new mongoose.Schema({
  author: {
    name: { type: String, required: true },
    photo: { type: String, required: true },
  },
  price: { type: Number, required: true, min: 1, max: 5 },
  duration: { type: Number, required: true, min: 0 },
  likes: { type: Number, default: 0 },
  hashtags: { type: [String], required: true },
  comments: { type: [String], default: [] },
})

const Itinerary = mongoose.model("itinerary", itinerarySchema)

module.exports = Itinerary
