import { Link } from "react-router-dom"
import { useState } from "react"
import FormInput from "../components/FormInput"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)
const Toast = MySwal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  showCloseButton: true,
})

const LogIn = () => {
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

  const handleAddClick = () => {
    const add = async () => {
      try {
        console.log(data)
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

    if (!(data.email && data.password)) {
      Toast.fire({
        icon: "error",
        title: "Both fields are required!",
      })
    } else {
      add()
      setData({
        email: "",
        password: "",
      })
    }
  }
  return (
    <main className="relative flex flex-col justify-center items-center px-5 md:px-20 transition duration-1000 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 flex-grow">
      <div className="flex flex-col gap-3 w-full" style={{ maxWidth: "330px" }}>
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
        <button
          className="transform active:scale-95 rounded mt-2 mb-1 py-2 text-gray-100 bg-green-500"
          type="button"
          onClick={handleAddClick}
        >
          Log In
        </button>
      </div>
      <p className="text-center">
        Don't have an account?{" "}
        <Link className="underline" to="/signup">
          Sign up.
        </Link>
      </p>
    </main>
  )
}

export default LogIn
