const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  itineraryId: { type: mongoose.Types.ObjectId, ref: "itinerary" },
  content: String,
})

const Comment = mongoose.model("comment", commentSchema)

module.exports = Comment
