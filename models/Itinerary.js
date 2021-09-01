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
  hashtags: { type: [String], required: true },
  likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  comments: [
    {
      userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
      content: { type: String, required: true },
      itineraryId: { type: String, required: true },
    },
  ],
  cityId: { type: mongoose.Types.ObjectId, ref: "city", required: true },
})

const Itinerary = mongoose.model("itinerary", itinerarySchema)

module.exports = Itinerary
