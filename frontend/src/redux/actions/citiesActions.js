import axios from "axios"

const citiesActions = {
  getCities: () => {
    return async (dispatch) => {
      const cities = await axios.get("http://localhost:4000/api/cities")
      dispatch({ type: "GET_ALL_CITIES", payload: cities.data.response })
    }
  },
  addCity: (data) => {
    return async (dispatch) => {
      const res = await axios.post("http://localhost:4000/api/cities", data)
      if (res.data.success) {
        dispatch({ type: "ADD_CITY", payload: res.data.response })
      } else {
        console.log(res.data.response)
        console.log(res.data.error)
      }
    }
  },
  deleteCity: (id) => {
    return async (dispatch) => {
      const res = await axios.delete(`http://localhost:4000/api/city/${id}`)
      if (res.data.success) {
        dispatch({ type: "DELETE_CITY", payload: id })
      } else {
        console.log(res.data.response)
        console.log(res.data.error)
      }
    }
  },
  updateCity: (id, newData) => {
    return async (dispatch) => {
      try {
        const res = await axios.put(
          `http://localhost:4000/api/city/${id}`,
          newData
        )
        if (res.data.success) {
          dispatch({
            type: "UPDATE_CITY",
            payload: { ...res.data.response, ...newData },
          })
        } else {
          throw new Error("We couldn't update the city.")
        }
      } catch (e) {
        console.error(e.message)
      }
    }
  },
}

export default citiesActions
