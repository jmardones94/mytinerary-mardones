import axios from "axios"

const citiesActions = {
  getCities: () => {
    return async (dispatch) => {
      try {
        const res = await axios.get("http://localhost:4000/api/cities")
        if (res.data.success) {
          dispatch({ type: "GET_ALL_CITIES", payload: res.data.response })
          return { success: true, error: null }
        } else {
          throw new Error("Internal server error. We couldn't get the cities.")
        }
      } catch (e) {
        console.error(e.message)
        return { success: false, error: e.message }
      }
    }
  },
  addCity: (data) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.post("http://localhost:4000/api/cities", data, {
          headers: { Authorization: `Bearer ${getState().users.user.token}` },
        })
        if (res.data.success) {
          dispatch({ type: "ADD_CITY", payload: res.data.response })
          return {
            success: true,
            error: null,
            response: res.data.response.name,
          }
        } else {
          throw new Error("Internal server error. We couldn't add the city.")
        }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  deleteCity: (id) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.delete(`http://localhost:4000/api/city/${id}`, {
          headers: { Authorization: `Bearer ${getState().users.user.token}` },
        })
        if (res.data.success) {
          dispatch({ type: "DELETE_CITY", payload: id })
          return { success: true, error: null }
        } else {
          throw new Error("Internal server error. We couldn't delete the city.")
        }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  updateCity: (id, newData) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.put(
          `http://localhost:4000/api/city/${id}`,
          newData,
          {
            headers: { Authorization: `Bearer ${getState().users.user.token}` },
          }
        )
        if (res.data.success) {
          dispatch({
            type: "UPDATE_CITY",
            payload: { ...res.data.response, ...newData },
          })
          return { success: true, error: null }
        } else {
          throw new Error("Internal server error. We couldn't update the city.")
        }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
}

export default citiesActions
