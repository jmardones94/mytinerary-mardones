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
        const res = await axios.post(
          "http://localhost:4000/api/user/login",
          userData
        )
        if (res.data.success) {
          console.log(res.data.response.token)
          localStorage.setItem("token", res.data.response.token)
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
      localStorage.removeItem("token")
      dispatch({ type: "LOG_OUT" })
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
          // console.log(res.data.response.token)
          localStorage.setItem("token", res.data.response.token)
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
  logInLS: (token) => {
    return async (dispatch) => {
      const headers = { token }
      try {
        const res = await axios.post(
          "http://localhost:4000/api/user/token",
          null,
          { headers }
        )
        if (res.data.success) {
          dispatch({
            type: "LOG_IN_LS",
            payload: { ...res.data.response, token },
          })
          return { success: true, error: null }
        } else {
          throw new Error(res.data.error.message)
        }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  validateToken: (token) => {
    return async (dispatch) => {
      const headers = { token }
      try {
        const res = await axios.post(
          "http://localhost:4000/api/user/token",
          null,
          { headers }
        )
        if (res.data.success) {
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
