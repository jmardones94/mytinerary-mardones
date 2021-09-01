const Itinerary = require("../models/Itinerary")

const commentsController = {
  addComment: async (req, res) => {
    try {
      const userId = req.user._id
      const itineraryId = req.params.itineraryId
      const content = req.body.content
      const newComment = {
        userId,
        content,
        itineraryId,
      }
      const updatedItinerary = await Itinerary.findOneAndUpdate(
        { _id: itineraryId },
        { $push: { comments: newComment } },
        { new: true }
      ).populate("comments.userId", 'firstName lastName photoURL _id email"')
      const lastComment =
        updatedItinerary.comments[updatedItinerary.comments.length - 1]
      res.json({
        success: true,
        response: {
          _id: lastComment._id,
          itineraryId: updatedItinerary._id,
          content: lastComment.content,
          userId: lastComment.userId,
        },
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  removeComment: async (req, res) => {
    try {
      const removedComment = await Itinerary.findByIdAndUpdate(
        { _id: req.body.itineraryId },
        { $pull: { comments: { _id: req.params.commentId } } },
        { new: true }
      )
      res.json({
        success: true,
        response: removedComment.comments[removedComment.comments.length - 1],
        error: null,
      })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getComments: async (req, res) => {
    try {
      const { itineraryId } = req.params
      const itinerary = await Itinerary.findOne({ _id: itineraryId }).populate(
        "comments.userId",
        "firstName lastName photoURL _id email"
      )
      res.json({ success: true, response: itinerary.comments, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  updateComment: async (req, res) => {
    try {
      const { content } = req.body
      const itinerary = await Itinerary.findOneAndUpdate(
        { "comments._id": req.params.commentId },
        { $set: { "comments.$.content": content } },
        { new: true }
      )
      res.json({ success: true, response: itinerary.comments, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
}

module.exports = commentsController
