const Comment = require("../models/Comment")

const commentsController = {
  addComment: async (req, res) => {
    // Cuando pruebe con frontend, mandar token, pasar por passport y obtener uid de req.user.id
    try {
      const userId = req.user._id
      const itineraryId = req.params.itineraryId
      const content = req.body.content
      const newComment = new Comment({
        userId,
        itineraryId,
        content,
      })
      const comment = await newComment.save()
      await Comment.populate(comment, "userId", (err, data) =>
        res.json({
          success: true,
          response: {
            _id: data._id,
            userId: {
              firstName: data.userId.firstName,
              lastName: data.userId.lastName,
              photoURL: data.userId.photoURL,
              _id: data.userId._id,
              email: data.userId.email,
            },
            itineraryId: data.itineraryId,
            content: data.content,
          },
          error: null,
        })
      )
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  removeComment: async (req, res) => {
    try {
      const comment = await Comment.findOneAndDelete({
        _id: req.params.commentId,
      })
      res.json({ success: true, response: comment, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  getComments: async (req, res) => {
    try {
      const { itineraryId } = req.params
      const comments = await Comment.find({ itineraryId }).populate(
        "userId",
        "firstName lastName photoURL _id email"
      )
      res.json({ success: true, response: comments, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
  updateComment: async (req, res) => {
    try {
      const { content } = req.body
      const comment = await Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        { content },
        { new: true }
      )
      res.json({ success: true, response: comment, error: null })
    } catch (e) {
      res.json({ success: false, response: null, error: e.message })
    }
  },
}

module.exports = commentsController
