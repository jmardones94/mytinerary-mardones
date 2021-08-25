const usersReducer = (
  state = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
    usersList: [],
  },
  action
) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      }
    case "LOG_OUT":
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      }
    case "GET_USERS":
      return {
        ...state,
        usersList: action.payload,
      }
    case "SIGN_UP":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      }
    default:
      return state
  }
}

export default usersReducer
