const itinerariesReducer = (state = { itineraries: [] }, action) => {
  switch (action.type) {
    case "GET_CITY_ITINERARIES":
      return {
        ...state,
        itineraries: [...state.itineraries, ...action.payload],
      }
    default:
      return state
  }
}

export default itinerariesReducer
