const Activity = require("../models/Activity")

const activitiesController = {
  getActivitiesByItineraryId: async (req, res) => {
    try {
      const activities = await Activity.find({
        itineraryId: req.params.itineraryId,
      })
      res.json({ success: true, response: activities, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getActivityById: async (req, res) => {
    try {
      const activity = await Activity.findOne({ _id: req.params.id })
      res.json({ success: true, response: activity, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  addActivity: async (req, res) => {
    try {
      const { pic, title } = req.body
      const itineraryId = req.params.itineraryId
      const newActivity = new Activity({
        pic,
        title,
        itineraryId,
      })
      const activity = await newActivity.save()
      res.json({ success: true, response: activity, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  updateActivity: async (req, res) => {
    try {
      const activity = await Activity.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
      )
      res.json({ success: true, response: activity, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  deleteActivity: async (req, res) => {
    console.log("activity deleted.")
    try {
      const activity = await Activity.findOneAndDelete({ _id: req.params.id })
      res.json({ success: true, response: activity, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
}

module.exports = activitiesController
