const usersReducer = (
  state = {
    user: false,
  },
  action
) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: action.payload,
      }
    case "LOG_OUT":
      return {
        ...state,
        user: false,
      }
    // case "GET_USERS":
    //   return {
    //     ...state,
    //     usersList: action.payload,
    //   }
    case "SIGN_UP":
      return {
        ...state,
        user: { ...action.payload, google: action.payload.google || false },
      }
    case "LOG_IN_LS":
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}

export default usersReducer
