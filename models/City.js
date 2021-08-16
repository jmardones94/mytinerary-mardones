const mongoose = require("mongoose")

const citySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  country: { type: String, required: true },
  src: { type: String, required: true },
  currencyCode: { type: String, maxLength: 3, uppercase: true, required: true },
})

const City = mongoose.model("city", citySchema)

module.exports = City
