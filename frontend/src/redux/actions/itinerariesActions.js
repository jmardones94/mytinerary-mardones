import axios from "axios"

const itinerariesActions = {
  getItineraries: () => {
    return async (dispatch) => {
      const itineraries = await axios.get(
        "http://localhost:4000/api/itineraries"
      )
      dispatch({
        type: "GET_ALL_ITINERARIES",
        payload: itineraries.data.response,
      })
    }
  },
}

export default itinerariesActions
