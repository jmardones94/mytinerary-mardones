const mongoose = require("mongoose")

const activitySchema = new mongoose.Schema({
  pic: { type: String, required: true },
  title: { type: String, required: true },
  itineraryId: {
    type: mongoose.Types.ObjectId,
    ref: "itinerary",
    required: true,
  },
})

const Activity = mongoose.model("activity", activitySchema)

module.exports = Activity
