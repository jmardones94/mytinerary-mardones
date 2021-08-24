import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import FormInput from "../components/FormInput"
import FormSelect from "./Form/FormSelect"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import axios from "axios"

const MySwal = withReactContent(Swal)
const Toast = MySwal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  showCloseButton: true,
})

const SignUp = () => {
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

  useEffect(() => {
    console.log("Cargar los países")
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

  const handleAddClick = () => {
    const signup = async () => {
      try {
        console.log({ ...data, country: selectedCountry })
        // if (res.success) {
        //   Toast.fire({
        //     icon: "success",
        //     title: `${res.response} successfully added!`,
        //   })
        // } else {
        //   throw new Error(`We couldn't add ${data.name}. Try again later.`)
        // }
      } catch (e) {
        Toast.fire({
          icon: "error",
          title: e.message,
        })
        console.error(e)
      }
    }

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
      signup()
      setData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        photoURL: "",
      })
      setSelectedCountry("")
    }
  }
  return (
    <main className="relative py-10 flex flex-col justify-center items-center px-5 md:px-20 transition duration-1000 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 flex-grow">
      <h2 className="font-medium text-xl md:text-3xl mb-8">
        Create your <span className="font-silt tracking-wide">MyTinerary</span>{" "}
        account
      </h2>
      <div className="flex flex-col gap-3 w-full" style={{ maxWidth: "380px" }}>
        <FormInput
          name="firstName"
          type="text"
          label="First Name"
          value={data.firstName}
          inputHandler={inputHandler}
          required={true}
          placeholder="John"
        />
        <FormInput
          name="lastName"
          type="text"
          label="Last Name"
          value={data.lastName}
          inputHandler={inputHandler}
          required={true}
          placeholder="Cena"
        />
        <FormInput
          name="email"
          type="email"
          label="Email"
          value={data.email}
          inputHandler={inputHandler}
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
          placeholder="Secure@Password#123456789"
        />
        <FormInput
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          value={data.confirmPassword}
          inputHandler={inputHandler}
          required={true}
          placeholder="Secure@Password#123456789"
        />
        <FormInput
          name="photoURL"
          type="text"
          label="Photo URL"
          value={data.photoURL}
          inputHandler={inputHandler}
          required={true}
          placeholder="https://example.com/your_photo.jpg"
        />
        <div className="flex justify-between items-center w-100">
          <label className="font-medium">Country</label>
          <div className="w-48 z-50">
            <FormSelect
              data={countries}
              selected={selectedCountry}
              setSelected={setSelectedCountry}
              itemName="Country"
            />
          </div>
        </div>
        <button
          className="transform active:scale-95 rounded mt-4 mb-1 py-2 text-gray-100 bg-green-500"
          type="button"
          onClick={handleAddClick}
        >
          Sign Up
        </button>
      </div>
      <p className="text-center">
        Already have an account?{" "}
        <Link className="underline" to="/login">
          Log in.
        </Link>
      </p>
    </main>
  )
}

export default SignUp
