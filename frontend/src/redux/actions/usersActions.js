import axios from "axios"

const usersActions = {
  getUsers: () => {
    return async (dispatch) => {
      try {
        const res = await axios.get("http://localhost:4000/api/users")
        if (res.data.success) {
          dispatch({ type: "GET_USERS", payload: res.data.response })
          return { success: true, response: "Users fetched.", error: null }
        } else {
          throw new Error("Couldn't get the users.")
        }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  logIn: (userData) => {
    return async (dispatch) => {
      try {
        console.log(userData)
        const res = await axios.post(
          "http://localhost:4000/api/user/login",
          userData
        )
        if (res.data.success) {
          localStorage.setItem("isLoggedIn", "true")
          localStorage.setItem("user", JSON.stringify(res.data.response))
          dispatch({ type: "LOG_IN", payload: res.data.response })

          return {
            success: true,
            response: `Welcome, ${res.data.response.firstName}`,
          }
        } else {
          throw new Error(res.data.error)
        }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  logOut: () => {
    return (dispatch) => {
      localStorage.setItem("isLoggedIn", "false")
      localStorage.removeItem("user")
      dispatch({ type: "LOG_OUT", payload: null })
    }
  },
  signUp: (newUser) => {
    return async (dispatch) => {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/user/signup",
          newUser
        )
        if (res.data.success) {
          localStorage.setItem("isLoggedIn", "true")
          localStorage.setItem("user", JSON.stringify(res.data.response))
          dispatch({ type: "SIGN_UP", payload: res.data.response })
          return { success: true, response: res.data.response, error: null }
        } else {
          throw new Error(res.data.error)
        }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
}

export default usersActions
