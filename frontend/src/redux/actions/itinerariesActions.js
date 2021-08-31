import axios from "axios"

const itinerariesActions = {
  getItineraries: (cityId) => {
    return async (dispatch) => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/itineraries/${cityId}`
        )
        if (res.data.success) {
          dispatch({
            type: "GET_CITY_ITINERARIES",
            payload: res.data.response,
          })
          return { success: true, error: null }
        } else {
          throw new Error("Internal server error.")
        }
      } catch (err) {
        return { success: false, error: err.message }
      }
    }
  },
  addLike: (itineraryId, userId) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.put(
          "http://localhost:4000/api/itinerary/like",
          { itineraryId },
          {
            headers: { Authorization: `Bearer ${getState().users.user.token}` },
          }
        )
        if (res.data.success) {
          dispatch({
            type: "ADD_LIKE",
            payload: { itinerary: res.data.response },
          })
          return { success: true, error: null }
        } else {
          throw new Error(res.data.error)
        }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  removeLike: (itineraryId, userId) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.put(
          "http://localhost:4000/api/itinerary/dislike",
          { itineraryId },
          {
            headers: { Authorization: `Bearer ${getState().users.user.token}` },
          }
        )
        if (res.data.success) {
          dispatch({
            type: "REMOVE_LIKE",
            payload: { itinerary: res.data.response },
          })
          return { success: true, error: null }
        } else {
          throw new Error(res.data.error)
        }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  addComment: (itineraryId, content) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post(
          `http://localhost:4000/api/itinerary/comments/${itineraryId}`,
          { content },
          {
            headers: { Authorization: `Bearer ${getState().users.user.token}` },
          }
        )
        if (response.data.success) {
          dispatch({
            type: "ADD_COMMENT",
            payload: response.data.response,
          })
          return { success: true, response: response.data.response }
        } else {
          throw new Error(response.data.error)
        }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  editComment: (commentId, newContent) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.put(
          `http://localhost:4000/api/itinerary/comment/${commentId}`,
          { content: newContent },
          {
            headers: { Authorization: `Bearer ${getState().users.user.token}` },
          }
        )
        if (res.data.success) {
          dispatch({ type: "UPDATE_COMMENT", payload: res.data.response })
          return { success: true, error: null }
        } else {
          throw new Error(res.data.error)
        }
      } catch (e) {
        return {
          success: false,
          error: "Error while editing this comment. Try again later.",
        }
      }
    }
  },
  removeComment: (commentId) => {
    return async (dispatch) => {
      try {
        const response = await axios.delete(
          `http://localhost:4000/api/itinerary/comment/${commentId}`
        )
        if (response.data.success) {
          dispatch({ type: "REMOVE_COMMENT", payload: commentId })
        } else {
          throw new Error(response.data.error)
        }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  getComments: (itineraryId) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/itinerary/comments/${itineraryId}`
        )
        if (res.data.success) {
          dispatch({ type: "GET_COMMENTS", payload: res.data.response })
          return { success: true, response: res.data.response, error: null }
        } else {
          throw new Error(res.data.error)
        }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  getActivities: (itineraryId) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/itinerary/activity/${itineraryId}`
        )
        if (res.data.success) {
          dispatch({ type: "GET_ACTIVITIES", payload: res.data.response })
          return { success: true, error: null }
        } else {
          throw new Error(res.data.error)
        }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
}

export default itinerariesActions
