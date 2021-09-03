const User = require("../models/User")
const Itinerary = require("../models/Itinerary")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

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
          google,
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
      const { firstName, lastName, photoURL, country, admin, google } = user
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
          google,
        },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  deleteUser: async (req, res) => {
    try {
      if (req.user.google) {
        await User.findOneAndDelete({ _id: req.user._id })
        await Itinerary.updateMany(
          { "comments.userId": req.user._id },
          { $pull: { comments: { userId: req.user._id } } }
        )
        await Itinerary.updateMany(
          { likes: req.user._id },
          { $pull: { likes: req.user._id } }
        )

        res.json({ success: true, response: "User deleted.", error: null })
      } else {
        const isValidPassword = await bcryptjs.compare(
          req.body.password,
          req.user.password
        )
        if (isValidPassword) {
          await User.findOneAndDelete({ _id: req.user._id })
          await Itinerary.updateMany(
            { "comments.userId": req.user._id },
            { $pull: { comments: { userId: req.user._id } } }
          )
          await Itinerary.updateMany(
            { likes: req.user._id },
            { $pull: { likes: req.user._id } }
          )
          res.json({ success: true, response: "User deleted.", error: null })
        } else {
          throw new Error("Invalid password.")
        }
      }
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  updateUser: async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      oldPassword,
      photoURL,
      country,
    } = req.body
    try {
      const user = await User.findOne({ _id: req.user._id })
      if (!user) throw new Error("Invalid id.")
      let isValidOldPassword = false
      if (oldPassword) {
        isValidOldPassword = await bcryptjs.compare(oldPassword, user.password)
        if (!isValidOldPassword) throw new Error("Invalid old password.")
      }
      let hashedNewPassword
      if (password) {
        if (password !== confirmPassword)
          throw new Error("Failed to confirm new password.")
        hashedNewPassword = await bcryptjs.hash(password, 10)
      }
      if (email && email !== req.user.email) {
        const newEmailInUse = await User.findOne({ email: email })
        if (newEmailInUse) throw new Error("Email already in use.")
      }
      const newData = await User.findOneAndUpdate(
        { _id: req.user._id },
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
      res.json({
        success: true,
        response: {
          firstName: newData.firstName,
          lastName: newData.lastName,
          email: newData.email,
          photoURL: newData.photoURL,
          country: newData.country,
          admin: newData.admin,
          _id: newData._id,
          token: jwt.sign({ ...newData }, process.env.SECRETORKEY),
          google: newData.google,
        },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  setAdmin: async (req, res) => {
    try {
      const reqKey = req.body.key
      if (reqKey !== process.env.SET_ADMIN_KEY) throw new Error("Invalid key.")
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
    const {
      google,
      firstName,
      lastName,
      country,
      email,
      photoURL,
      admin,
      _id,
    } = req.user
    res.json({
      success: true,
      response: {
        firstName,
        lastName,
        country,
        email,
        photoURL,
        admin,
        _id,
        google,
      },
      error: null,
    })
  },
  adminValidation: (req, res) => {
    res.json({ success: true, error: null })
  },
}

module.exports = usersController
