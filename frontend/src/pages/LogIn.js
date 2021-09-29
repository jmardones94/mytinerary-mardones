import { Link } from "react-router-dom"
import { useState } from "react"
import FormInput from "../components/FormInput"
import usersActions from "../redux/actions/usersActions"
import { connect } from "react-redux"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import GoogleLogin from "react-google-login"

const MySwal = withReactContent(Swal)
const Toast = MySwal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  showCloseButton: true,
})

const LogIn = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  })
  const inputHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      handleLogIn()
    }
  }

  const handleLogIn = async () => {
    const logIn = async () => {
      try {
        const res = await props.logIn(data)
        if (res.success) {
          Toast.fire({
            icon: "success",
            title: res.response,
          })
        } else {
          throw new Error(res.error)
        }
      } catch (e) {
        Toast.fire({
          icon: "error",
          title: e.message,
        })
        console.error(e)
      }
    }

    if (!(data.email && data.password)) {
      Toast.fire({
        icon: "error",
        title: "Both fields are required!",
      })
    } else {
      logIn()
      setData({
        email: "",
        password: "",
      })
    }
  }
  const responseGoogle = async (response) => {
    if (response.error) return false
    try {
      const res = await props.logIn({
        email: response.profileObj.email,
        password: "Aa" + response.profileObj.googleId,
        flagGoogle: true,
      })
      if (res.success) {
        Toast.fire({
          icon: "success",
          title: res.response,
        })
      } else {
        throw new Error(res.error)
      }
    } catch (e) {
      Toast.fire({
        icon: "error",
        title: e.message,
      })
    }
  }
  return (
    <main className="py-10 relative flex flex-col justify-center items-center px-5 md:px-20 transition duration-1000 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 flex-grow">
      <div className="flex flex-col gap-3 w-full" style={{ maxWidth: "330px" }}>
        <FormInput
          name="email"
          type="email"
          label="Email"
          value={data.email}
          inputHandler={inputHandler}
          keyDownHandler={keyDownHandler}
          required={true}
          placeholder="example@email.com"
        />
        <FormInput
          name="password"
          type="password"
          label="Password"
          value={data.password}
          inputHandler={inputHandler}
          required={true}
          keyDownHandler={keyDownHandler}
          placeholder="Secure@Password#123456789"
        />
        <button
          className="transform active:scale-95 rounded mt-2 mb-1 py-2 text-gray-100 bg-green-500"
          type="button"
          onClick={handleLogIn}
        >
          Log In
        </button>
      </div>
      <p className="text-center">
        Don't have an account yet?{" "}
        <Link className="underline" to="/signup">
          Sign up.
        </Link>
      </p>
      <div
        className="py-2 w-full flex flex-col items-center"
        style={{ maxWidth: "330px" }}
      >
        <hr className="w-full mb-4" />
        <GoogleLogin
          className="w-full flex justify-center"
          clientId="882777434849-hu82d9toesccr9mp885gfba65cdviapb.apps.googleusercontent.com"
          buttonText="Log In with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </main>
  )
}

const mapDispatchToProps = {
  logIn: usersActions.logIn,
}

export default connect(null, mapDispatchToProps)(LogIn)
