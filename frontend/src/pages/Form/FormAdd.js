import { useState } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import citiesActions from "../../redux/actions/citiesActions"
import { connect } from "react-redux"
import FormInput from "../../components/FormInput"

const MySwal = withReactContent(Swal)
const Toast = MySwal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  showCloseButton: true,
})

const FormAdd = (props) => {
  const [data, setData] = useState({
    name: "",
    country: "",
    src: "",
    currencyCode: "",
    description: "",
    countryFlag: "",
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
        const res = await props.addCity(data)
        console.log(res)
        if (res.success) {
          Toast.fire({
            icon: "success",
            title: `${res.response} successfully added!`,
          })
        } else {
          throw new Error(`We couldn't add ${data.name}. Try again later.`)
        }
      } catch (e) {
        Toast.fire({
          icon: "error",
          title: e.message,
        })
        console.error(e)
      }
    }
    if (!(data.name && data.country)) {
      Toast.fire({
        icon: "error",
        title: "There are some empty fields required!",
      })
    } else {
      add()
      setData({
        name: "",
        country: "",
        src: "",
        currencyCode: "",
        countryFlag: "",
        description: "",
      })
    }
  }

  return (
    <main className="relative flex flex-col justify-center items-center px-5 md:px-20 transition duration-1000 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 flex-grow">
      <div className="flex gap-3 absolute left-2 top-2">
        <Link
          className="bg-green-500 text-gray-100 py-1 px-3 w-20 text-center rounded "
          to="/form/add"
        >
          Add
        </Link>
        <Link
          className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-100 w-20 text-center py-1 px-3 rounded "
          to="/form/update"
        >
          Update
        </Link>
        <Link
          className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-gray-100 w-20 text-center py-1 px-3 rounded "
          to="/form/delete"
        >
          Delete
        </Link>
      </div>
      <h2 className="text-center text-xl mb-5 mt-16 md:mt-5">Add a city</h2>

      <div className="flex flex-col gap-3 w-full" style={{ maxWidth: "330px" }}>
        <p className="-mt-5 w-full text-right text-sm underline tracking-tight">
          * Required field
        </p>
        <FormInput
          name="name"
          type="text"
          label="City Name *"
          value={data.name}
          inputHandler={inputHandler}
          required={true}
          placeholder="New York"
        />
        <FormInput
          name="country"
          type="text"
          label="Country *"
          value={data.country}
          inputHandler={inputHandler}
          required={true}
          placeholder="United States"
        />
        <FormInput
          name="src"
          type="text"
          label="City Photo"
          value={data.src}
          inputHandler={inputHandler}
          required={false}
          placeholder="https://example.url.com/cityphoto.jpg"
        />
        <FormInput
          name="currencyCode"
          type="text"
          label="Currency Code"
          value={data.currencyCode}
          inputHandler={inputHandler}
          required={false}
          placeholder="USD"
        />
        <FormInput
          name="countryFlag"
          type="text"
          label="Flag Image"
          value={data.countryFlag}
          inputHandler={inputHandler}
          required={false}
          placeholder="https://example.com/flag.png"
        />
        <FormInput
          name="description"
          type="text"
          label="Description"
          value={data.description}
          inputHandler={inputHandler}
          required={false}
          placeholder="New York is a city of USA."
        />
        <button
          className="transform active:scale-95 rounded my-4 py-2 text-gray-100 bg-green-500"
          type="button"
          onClick={handleAddClick}
        >
          Add
        </button>
      </div>
    </main>
  )
}

const mapDispatchToProps = {
  addCity: citiesActions.addCity,
}

export default connect(null, mapDispatchToProps)(FormAdd)
