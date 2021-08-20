const City = require("../models/City")
const required = ["name", "country", "src", "currencyCode"]

const citiesController = {
  getCities: async (req, res) => {
    try {
      const cities = await City.find()
      res.json({ success: true, response: cities, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getCity: async (req, res) => {
    try {
      const city = await City.findOne({ _id: req.params.id })
      if (!city) {
        throw new Error("This city doesn't exists.")
      }
      res.json({ success: true, response: city, error: null })
    } catch (e) {
      res.json({ success: false, response: "", error: e.message })
    }
  },
  addCity: async (req, res) => {
    try {
      const capitalizedName = req.body.name
        .trim()
        .split(" ")
        .map((w) => {
          const newW = w.trim()
          return newW.charAt(0).toUpperCase() + newW.slice(1).toLowerCase()
        })
        .join(" ")
      const alreadyAdded = await City.findOne({ name: capitalizedName })
      if (alreadyAdded) {
        throw new Error(`${capitalizedName} already exists in the database.`)
      }
      const newCity = new City({
        name: capitalizedName,
        country: req.body.country,
        src: req.body.src,
        currencyCode: req.body.currencyCode,
      })
      await newCity.save()
      res.json({
        success: true,
        response: newCity,
        error: null,
      })
    } catch (e) {
      res.json({
        success: false,
        response: "We couldn't add the city",
        error: e.message,
      })
    }
  },
  deleteCity: async (req, res) => {
    try {
      const city = await City.findOneAndDelete({ _id: req.params.id })
      res.json({
        success: true,
        response: `${city.name} deleted.`,
        error: null,
      })
    } catch (e) {
      res.json({
        success: false,
        response: "We couldn't delete the city.",
        error: e,
      })
    }
  },
  updateCity: async (req, res) => {
    try {
      for (const key in req.body) {
        if (required.includes(key) && !req.body[key].length) {
          throw new Error(`Invalid data. ${key} is required.`)
        }
      }
      const city = await City.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body }
      )
      res.json({
        success: true,
        response: city,
        error: null,
      })
    } catch (e) {
      res.json({
        success: false,
        response: "We couldn't update the city.",
        error: e.message,
      })
    }
  },
}

module.exports = citiesController
