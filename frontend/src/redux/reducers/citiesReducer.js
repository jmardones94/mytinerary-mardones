const citiesReducer = (state = { cities: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_CITIES":
      return {
        ...state,
        cities: action.payload,
      }
    case "ADD_CITY":
      return {
        ...state,
        cities: [...state.cities, action.payload],
      }
    case "DELETE_CITY":
      return {
        ...state,
        cities: state.cities.filter((city) => city._id !== action.payload),
      }
    case "UPDATE_CITY":
      const newCities = state.cities.map((city) => {
        if (city._id === action.payload._id) {
          return action.payload
        }
        return city
      })
      return {
        ...state,
        cities: newCities,
      }
    default:
      return state
  }
}

export default citiesReducer
