const User = require("../models/User")
const bcryptjs = require("bcryptjs")

const usersController = {
  getUsers: async (req, res) => {
    // CREAR GETUSERS
  },
  getUserById: async (req, res) => {
    // CREATE GET USER
  },
  createUser: async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      photoURL,
      country,
    } = req.body

    try {
      const alreadyExist = await User.findOne({ email: email })
      console.log(alreadyExist)
      if (alreadyExist) throw new Error("Email in use.")
      if (password !== confirmPassword)
        throw new Error("Passwords doesn't match.")
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        photoURL,
        country,
      })
      await newUser.save()
      res.json({ success: true, response: "Account created!", error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  logIn: async (req, res) => {
    // CREAR LOGIN
  },
  deleteUser: async (req, res) => {
    // CREATE DELETE USER
  },
  updateUser: async (req, res) => {
    // CREATE UPDATE USER
  },
}

module.exports = usersController
