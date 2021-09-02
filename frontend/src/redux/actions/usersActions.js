import axios from "axios"

const usersActions = {
  logIn: (userData) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/user/login",
          userData
        )
        if (res.data.success) {
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
          localStorage.setItem("token", res.data.response.token)
          dispatch({ type: "SIGN_UP", payload: res.data.response })
          return { success: true, response: res.data.response, error: null }
        } else {
          return {
            success: false,
            response: null,
            error: res.data.errors || res.data.error,
          }
        }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  logInLS: (token) => {
    return async (dispatch) => {
      const headers = { Authorization: `Bearer ${token}` }
      try {
        const res = await axios.get(
          "http://localhost:4000/api/validate/token",
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
        localStorage.removeItem("token")
        dispatch({ type: "LOG_OUT" })
        return { success: false, error: e.message }
      }
    }
  },
  validateToken: (token) => {
    return async (dispatch) => {
      const headers = { Authorization: `Bearer ${token}` }
      try {
        const res = await axios.get(
          "http://localhost:4000/api/validate/token",
          { headers }
        )
        if (res.data.success) {
          return { success: true, error: null }
        } else {
          throw new Error(res.data.error)
        }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  validateAdmin: (token) => {
    return async (dispatch) => {
      try {
        const headers = { Authorization: `Bearer ${token}` }
        const res = await axios.get(
          "http://localhost:4000/api/validate/admin",
          { headers }
        )
        if (res.data.success) {
          return { success: true, error: null }
        } else {
          throw new Error(res.data.error)
        }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  deleteAccount: (password) => {
    return async (dispatch, getState) => {
      try {
        const token = getState().users.user.token
        const id = getState().users.user._id
        const res = await axios.delete("http://localhost:4000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
          data: { password },
        })
        if (res.data.success) {
          localStorage.removeItem("token")
          dispatch({ type: "DELETE_ACCOUNT" })
          return { success: true, response: id, error: null }
        } else {
          throw new Error(res.data.error)
        }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  updateUser: (data) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.put("http://localhost:4000/api/user", data, {
          headers: { Authorization: `Bearer ${getState().users.user.token}` },
        })
        if (res.data.success) {
          dispatch({ type: "LOG_IN", payload: res.data.response })
          return { success: true, error: null }
        } else {
          throw new Error(res.data.error)
        }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
}

export default usersActions
