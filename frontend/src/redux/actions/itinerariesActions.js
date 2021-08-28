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
          "http://localhost:4000/api/itinerary/unlike",
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
}

export default itinerariesActions
