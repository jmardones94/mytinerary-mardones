import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import FormInput from "../components/FormInput"
import FormSelect from "./Settings/FormSelect"
import axios from "axios"
import usersActions from "../redux/actions/usersActions"
import { connect } from "react-redux"
import GoogleLogin from "react-google-login"
import { PhotographIcon } from "@heroicons/react/outline"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)
const Toast = MySwal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 10000,
  timerProgressBar: true,
  showCloseButton: true,
})

const SignUp = (props) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    photoURL: "",
  })
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState("")
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    photoURL: "",
    country: "",
  })
  const [avatarSectionVisible, setAvatarSectionVisible] = useState(false)

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        setCountries(
          res.data.map((c) => {
            return { name: c.name }
          })
        )
      })
      .catch((e) => console.error(e.message))
  }, [])

  const inputHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      handleSignUp()
    }
  }

  const handleSignUp = async () => {
    if (
      !(
        data.firstName &&
        data.lastName &&
        data.email &&
        data.password &&
        data.confirmPassword &&
        selectedCountry
      )
    ) {
      Toast.fire({
        icon: "error",
        title: "All fields are required!",
      })
    } else {
      try {
        const res = await props.signUp({ ...data, country: selectedCountry })
        if (res.success) {
          await Toast.fire({
            icon: "success",
            title: `Account created. Welcome, ${res.response.firstName}!`,
          })
          return false
        } else {
          if (Array.isArray(res.error)) {
            setErrors({
              firstName: res.error.find((e) => e.context.label === "firstName")
                ?.message,
              lastName: res.error.find((e) => e.context.label === "lastName")
                ?.message,
              email: res.error.find((e) => e.context.label === "email")
                ?.message,
              password: res.error.find((e) => e.context.label === "password")
                ?.message,
              confirmPassword: res.error.find(
                (e) => e.context.label === "confirmPassword"
              )?.message,
              photoURL: res.error.find((e) => e.context.label === "photoURL")
                ?.message,
              country: res.error.find((e) => e.context.label === "countryURL")
                ?.message,
            })
          } else {
            throw new Error(res.error)
          }
        }
      } catch (e) {
        Toast.fire({
          icon: "error",
          title: e.message,
        })
        console.log(e)
      }
    }
  }

  const responseGoogle = async (response) => {
    if (response.error) return false
    const user = {
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      email: response.profileObj.email,
      photoURL: response.profileObj.imageUrl,
      password: response.googleId,
      confirmPassword: response.googleId,
      country: "Internet",
      google: true,
    }
    try {
      const res = await props.signUp(user)
      if (res.success) {
        await Toast.fire({
          icon: "success",
          title: `Account created. Welcome to MyTinerary, ${res.response.firstName}!`,
        })
        return false
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

  const avatars = [
    "https://i.imgur.com/OqloSPp.jpg",
    "https://i.imgur.com/wWZHn3v.jpg",
    "https://i.imgur.com/2TlFTKV.jpg",
    "https://i.imgur.com/zeEQeRZ.jpg",
    "https://i.imgur.com/O4rwcXT.jpg",
    "https://i.imgur.com/guyrHyC.jpg",
  ]
  return (
    <main
      onClick={(e) => {
        if (!e.target.id.includes("avatar") && e.target.tagName !== "path") {
          setAvatarSectionVisible(false)
        }
      }}
      className="relative py-10 flex flex-col justify-center items-center px-5 md:px-20 transition duration-1000 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 flex-grow"
    >
      <h2 className="font-medium text-xl md:text-3xl mb-8">
        Create your <span className="font-silt tracking-wide">MyTinerary</span>{" "}
        account
      </h2>
      <div className="flex gap-3 flex-col w-full justify-center items-center">
        <div
          className="py-2 w-full flex flex-col mt-4 items-center"
          style={{ maxWidth: "340px" }}
        >
          <GoogleLogin
            className="w-full flex justify-center font-ui"
            clientId="882777434849-bt8b0ir8d36unblj1gcsuf6glt1l0k11.apps.googleusercontent.com"
            buttonText="Sign up with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          {/* <hr className="w-4/5 mb-4 mt-1" /> */}
        </div>
        <div
          className="flex flex-col mt-2 gap-1 w-full"
          style={{ maxWidth: "340px" }}
        >
          <p className="text-center w-full mb-6 text-xl font-semibold tracking-wide">
            Or fill the registration form
          </p>
          <FormInput
            name="firstName"
            type="text"
            label="First Name"
            value={data.firstName}
            inputHandler={inputHandler}
            keyDownHandler={keyDownHandler}
            required={true}
            placeholder="Shinichi"
          />
          <ErrorMessage content={errors.firstName} />
          <FormInput
            name="lastName"
            type="text"
            label="Last Name"
            value={data.lastName}
            inputHandler={inputHandler}
            keyDownHandler={keyDownHandler}
            required={true}
            placeholder="Kudo"
          />
          <ErrorMessage content={errors.lastName} />
          <FormInput
            name="email"
            type="email"
            label="Email"
            value={data.email}
            inputHandler={inputHandler}
            keyDownHandler={keyDownHandler}
            required={true}
            placeholder="example@email.com"
          />{" "}
          <ErrorMessage content={errors.email} />
          <FormInput
            name="password"
            type="password"
            label="Password"
            value={data.password}
            inputHandler={inputHandler}
            keyDownHandler={keyDownHandler}
            required={true}
            placeholder="Secure password"
          />
          <ErrorMessage content={errors.password} />
          <FormInput
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={data.confirmPassword}
            inputHandler={inputHandler}
            keyDownHandler={keyDownHandler}
            required={true}
            placeholder="Secure password"
          />
          <ErrorMessage content={errors.confirmPassword} />
          <div className="relative flex">
            <FormInput
              name="photoURL"
              type="text"
              label="Photo URL"
              value={data.photoURL}
              inputHandler={inputHandler}
              keyDownHandler={keyDownHandler}
              required={true}
              placeholder="Or choose an avatar! →"
            />
            <PhotographIcon
              id="avatar-visibility-toggle"
              onClick={() => setAvatarSectionVisible(!avatarSectionVisible)}
              className="z-50 cursor-pointer absolute transition duration-1000 text-gray-900 bg-gray-100 dark:text-gray-100 dark:bg-gray-900 -right-7 h-full rounded"
            />
            {avatarSectionVisible && (
              <div className="z-40 py-2 absolute w-full justify-center -right-3 bottom-0 rounded bg-white flex gap-2 flex-wrap">
                {avatars.map((avatar, i) => (
                  <div
                    key={avatar}
                    onClick={() => {
                      setAvatarSectionVisible(false)
                      setData({
                        ...data,
                        photoURL: avatar,
                      })
                    }}
                    id={`avatar${i + 1}`}
                    className="cursor-pointer w-24 h-24 rounded-full"
                    style={{
                      backgroundImage: `url("${avatar}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>
          <ErrorMessage content={errors.photoURL} />
          <div className="flex justify-between items-center w-100">
            <label className="font-medium">Country</label>
            <div className="w-48 z-30">
              <FormSelect
                data={countries}
                selected={selectedCountry}
                setSelected={setSelectedCountry}
                itemName="Country"
              />
              {/* <ErrorMessage content={errors.countries} /> */}
            </div>
          </div>
          <button
            className="transform active:scale-95 rounded mt-4 py-2 text-gray-100 bg-green-500"
            type="button"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link className="underline" to="/login">
              Log in.
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

const ErrorMessage = ({ content }) => {
  return (
    <p
      className={`${
        content
          ? "text-red-500"
          : "dark:text-gray-900 text-gray-200 transition duration-1000 "
      } text-xs text-right leading-3`}
    >
      {content || "."}
    </p>
  )
}

const mapDispatchToProps = {
  signUp: usersActions.signUp,
}

export default connect(null, mapDispatchToProps)(SignUp)
