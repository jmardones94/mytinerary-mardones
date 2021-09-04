import axios from "axios"

const settingsActions = {
  getFavorites: () => {
    return async (dispatch, getState) => {
      try {
        const token = getState().users.user.token
        const res = await axios.get(
          "https://mytinerary-mardones.herokuapp.com/api/itineraries/user",
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (res.data.success) {
          return { success: true, response: res.data.response, error: null }
        } else {
          throw new Error(res.data.error)
        }
      } catch (e) {
        return { success: false, response: [], error: e.message }
      }
    }
  },
}

export default settingsActions
