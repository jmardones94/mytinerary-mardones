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
}

export default itinerariesActions
