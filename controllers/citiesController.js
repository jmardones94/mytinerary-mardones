const City = require("../models/City");

const citiesController = {
  getCities: (req, res) => {
    City.find()
      .then((cities) => res.json({ response: cities }))
      .catch((err) => res.json({ error: err }));
  },
  getCityById: (req, res) => {
    console.log(req.params.id);
    City.findOne({ _id: req.params.id })
      .then((city) => res.json({ response: city }))
      .catch((err) => res.json({ response: {}, success: false, error: err }));
  },
  addNewCity: (req, res) => {
    const newCity = new City({
      name: req.body.name,
      country: req.body.country,
      src: req.body.src,
      currencyCode: req.body.currencyCode,
    });
    newCity
      .save()
      .then(() => res.json({ success: true }))
      .catch((err) => res.json({ success: false, error: err }));
  },
  deleteCity: (req, res) => {
    City.findOneAndDelete({ _id: req.params.id })
      .then(() => res.json({ success: true }))
      .catch((err) => res.json({ success: false, error: err }));
  },
  updateCity: (req, res) => {
    City.findOneAndUpdate({ _id: req.params.id }, { ...req.body })
      .then(() => res.json({ success: true }))
      .catch((err) => res.json({ success: false, error: err }));
  },
};

module.exports = citiesController;
