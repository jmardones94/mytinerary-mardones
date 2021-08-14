const City = require("../models/City");

const citiesController = {
  getCities: async (req, res) => {
    try {
      const cities = await City.find();
      res.json({ success: true, response: cities });
    } catch (e) {
      res.json({ success: false, error: e });
    }
  },
  getCityById: async (req, res) => {
    try {
      const city = await City.findOne({ _id: req.params.id });
      res.json({ success: true, response: city });
    } catch (e) {
      res.json({ success: false, response: e });
    }
  },
  addNewCity: async (req, res) => {
    const newCity = new City({
      name: req.body.name
        .split(" ")
        .map((w) => {
          const newW = w.trim();
          return newW.charAt(0).toUpperCase() + newW.slice(1).toLowerCase();
        })
        .join(" "),
      country: req.body.country,
      src: req.body.src,
      currencyCode: req.body.currencyCode,
    });
    try {
      const city = await newCity.save();
      res.json({ success: true, error: null, city: city });
    } catch (e) {
      res.json({ success: false, error: e, city: null });
    }
  },
  deleteCity: async (req, res) => {
    try {
      const city = await City.findOneAndDelete({ _id: req.params.id });
      res.json({ success: true, city: city, error: null });
    } catch (e) {
      res.json({ success: false, city: null, error: e });
    }
  },
  updateCity: async (req, res) => {
    try {
      const city = await City.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body }
      );
      res.json({ success: true, error: null, city: city });
    } catch (e) {
      res.json({ success: false, error: e, city: null });
    }
  },
};

module.exports = citiesController;
