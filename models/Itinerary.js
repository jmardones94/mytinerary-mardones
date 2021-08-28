const mongoose = require("mongoose")

const itinerarySchema = new mongoose.Schema({
  author: {
    name: { type: String, required: true },
    photo: { type: String, required: true },
  },
  title: { type: String, required: true },
  photos: { type: [String], required: true },
  description: { type: String },
  price: { type: Number, required: true, min: 1, max: 5 },
  duration: { type: Number, required: true, min: 0 },
  likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  hashtags: { type: [String], required: true },
  cityId: { type: mongoose.Types.ObjectId, ref: "city", required: true },
})

const Itinerary = mongoose.model("itinerary", itinerarySchema)

module.exports = Itinerary
