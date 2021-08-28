const itinerariesReducer = (state = { itineraries: [] }, action) => {
  switch (action.type) {
    case "GET_CITY_ITINERARIES":
      return {
        ...state,
        itineraries: [...state.itineraries, ...action.payload],
      }
    case "ADD_LIKE":
      return {
        ...state,
        itineraries: state.itineraries.map((i) =>
          i._id === action.payload.itinerary._id
            ? { ...i, likes: action.payload.itinerary.likes }
            : i
        ),
      }
    case "REMOVE_LIKE":
      return {
        ...state,
        itineraries: state.itineraries.map((i) =>
          i._id === action.payload.itinerary._id
            ? {
                ...i,
                likes: action.payload.itinerary.likes,
              }
            : i
        ),
      }
    default:
      return state
  }
}

export default itinerariesReducer
