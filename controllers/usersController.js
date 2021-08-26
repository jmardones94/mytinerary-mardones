const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Test, la key sin hashear es 12345.
const key = "$2a$10$6IErsP3d/sZXb.WLiMy6veaPhl5Y57lhfV4aGGpqFMskFAJnkOwKq"

const usersController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find()
      if (!users.length) throw new Error("No users found.")
      res.json({ success: true, response: users, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getUserByEmail: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email })
      if (!user) throw new Error("User not found.")
      res.json({ success: true, response: user, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
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
      if (alreadyExist) throw new Error("Email in use.")
      if (password !== confirmPassword)
        throw new Error("Passwords doesn't match.")
      const hashedPassword = await bcryptjs.hash(password, 10)
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        photoURL,
        country,
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
          token: jwt.sign({ ...user }, process.env.SECRETORKEY),
        },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  logIn: async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await User.findOne({ email: email })
      if (!user) throw new Error("Invalid credentials.")
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
        },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findOneAndDelete({ email: req.params.email })
      res.json({ success: true, response: "User deleted.", error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  updateUser: async (req, res) => {
    // work on validations later...
    const { firstName, lastName, email, password, photoURL, country } = req.body
    try {
      const user = await User.findOne({ email: req.params.email })
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
  tokenValidation: async (req, res) => {
    jwt.verify(req.headers.token, process.env.SECRETORKEY, (err, result) => {
      if (err) {
        res.json({ success: false, response: null, error: err.message })
      }
      const { firstName, lastName, email, photoURL, country, admin } =
        result._doc
      res.json({
        success: true,
        response: { firstName, lastName, email, photoURL, country, admin },
        error: null,
      })
    })
  },
}

module.exports = usersController
