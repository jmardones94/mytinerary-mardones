const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  photoURL: { type: String, required: true },
  country: { type: String, required: true },
  admin: { type: Boolean, default: false },
})

const User = mongoose.model("user", userSchema)

module.exports = User
