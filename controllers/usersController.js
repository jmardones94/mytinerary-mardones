const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Test, la key sin hashear es 12345.
const key = "$2a$10$6IErsP3d/sZXb.WLiMy6veaPhl5Y57lhfV4aGGpqFMskFAJnkOwKq"

const usersController = {
  createUser: async (req, res) => {
    const { firstName, lastName, email, password, photoURL, country, google } =
      req.body
    try {
      const alreadyExist = await User.findOne({ email: email })
      if (alreadyExist) throw new Error("Email in use.")
      const hashedPassword = await bcryptjs.hash(password, 10)
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        photoURL,
        country,
        google,
      })
      const user = await newUser.save()
      res.json({
        success: true,
        response: {
          firstName,
          lastName,
          email,
          photoURL,
          country,
          admin: false,
          _id: user._id,
          token: jwt.sign({ ...user }, process.env.SECRETORKEY),
        },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  logIn: async (req, res) => {
    const { email, password, flagGoogle } = req.body
    try {
      const user = await User.findOne({ email: email })
      if (!user) throw new Error("Invalid credentials.")
      if (user.google && !flagGoogle)
        throw new Error(
          "You have a google account registered, please log in with them."
        )
      const isValidPassword = await bcryptjs.compare(password, user.password)
      if (!isValidPassword) throw new Error("Invalid credentials.")
      const { firstName, lastName, photoURL, country, admin } = user
      res.json({
        success: true,
        response: {
          firstName,
          lastName,
          email,
          photoURL,
          country,
          admin,
          token: jwt.sign({ ...user }, process.env.SECRETORKEY),
          _id: user._id,
        },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  deleteUser: async (req, res) => {
    try {
      const isValidPassword = await bcryptjs.compare(
        req.body.password,
        req.user.password
      )
      if (isValidPassword) {
        await User.findOneAndDelete({ _id: req.user._id })
        res.json({ success: true, response: "User deleted.", error: null })
      } else {
        throw new Error("Invalid password.")
      }
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  updateUser: async (req, res) => {
    // work on validations later...
    const { firstName, lastName, email, password, photoURL, country } = req.body
    try {
      const user = await User.findOne({ _id: req.params.id })
      let hashedNewPassword
      if (!user) throw new Error("Invalid id.")
      if (password) {
        hashedNewPassword = await bcryptjs.hash(password, 10)
      }
      if (email) {
        const newEmailInUse = await User.findOne({ email: email })
        if (newEmailInUse) throw new Error("Email already in use.")
      }
      const newData = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          firstName: firstName || user.firstName,
          lastName: lastName || user.lastName,
          email: email || user.email,
          password: hashedNewPassword || user.password,
          photoURL: photoURL || user.photoURL,
          country: country || user.country,
        },
        { new: true }
      )
      res.json({ success: true, response: newData, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  setAdmin: async (req, res) => {
    try {
      const reqKey = req.body.key
      const validKey = await bcryptjs.compare(reqKey, key)
      if (!validKey) throw new Error("Invalid key.")
      const newAdmin = await User.findOneAndUpdate(
        { _id: req.params.id },
        { admin: req.body.admin },
        { new: true }
      )
      res.json({ success: true, response: newAdmin, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  tokenValidation: (req, res) => {
    const { firstName, lastName, country, email, photoURL, admin, _id } =
      req.user
    res.json({
      success: true,
      response: { firstName, lastName, country, email, photoURL, admin, _id },
      error: null,
    })
  },
  adminValidation: (req, res) => {
    res.json({ success: true, error: null })
  },
}

module.exports = usersController
