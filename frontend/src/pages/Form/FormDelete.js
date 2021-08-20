import { useState, useEffect } from "react"
// import { Listbox, Transition } from "@headlessui/react"
// import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import citiesActions from "../../redux/actions/citiesActions"
import FormSelect from "./FormSelect"
// import axios from "axios"
// import Swal from "sweetalert2"
// import withReactContent from "sweetalert2-react-content"

// const MySwal = withReactContent(Swal)
// const Toast = MySwal.mixin({
//   toast: true,
//   position: "bottom",
//   showConfirmButton: false,
//   timer: 3000,
//   timerProgressBar: true,
// })

const FormDelete = (props) => {
  // const [cities, setCities] = useState([])
  const cities = [...props.cities] || []
  // const [deleteCount, setDeleteCount] = useState(0)
  const [selected, setSelected] = useState("")
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // const [loading, setLoading] = useState(true)
  // const [fetchOk, setFetchOk] = useState(null)
  // useEffect(() => {
  //   setLoading(true)
  //   axios
  //     .get("http://localhost:4000/api/cities")
  //     .then((res) => {
  //       setCities(res.data.response)
  //       setFetchOk(true)
  //     })
  //     .catch((err) => {
  //       Toast.fire({
  //         title: err.message,
  //         icon: "error",
  //       })
  //       setFetchOk(false)
  //     })
  //     .finally(() => setLoading(false))
  // }, [deleteCount])

  // const handleDeleteClick = async () => {
  //   try {
  //     const cityId = cities.find((city) => city.name === selected)._id
  //     const res = await axios.delete(`http://localhost:4000/api/city/${cityId}`)
  //     if (res.data.success) {
  //       setDeleteCount(deleteCount + 1)
  //       setSelected("")
  //       Toast.fire({
  //         icon: "success",
  //         title: `${selected} successfully deleted.`,
  //       })
  //     } else {
  //       throw new Error(
  //         "Our database couldn't handle your request. Please try again later."
  //       )
  //     }
  //   } catch (e) {
  //     Toast.fire({
  //       title: e.message,
  //       icon: "error",
  //     })
  //   }
  // }

  const handleDeleteClick = () => {
    props.deleteCity(cities.find((city) => city.name === selected)._id)
    setSelected("")
  }

  return (
    <main className="relative flex justify-center flex-col items-center px-5 md:px-20 transition duration-1000 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 flex-grow">
      <div className="flex gap-3 absolute left-2 top-2">
        <Link
          className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-100 w-20 text-center py-1 px-3 rounded "
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
          className="bg-red-500 text-gray-100 py-1 px-3 w-20 text-center rounded "
          to="/form/delete"
        >
          Delete
        </Link>
      </div>
      <h2 className="text-center text-lg mb-3 mt-16 md:mt-0">
        Select the city you want to delete
      </h2>
      <FormSelect
        selected={selected}
        setSelected={setSelected}
        cities={cities}
      />
      <div>
        <button
          onClick={(e) => {
            selected && handleDeleteClick()
          }}
          className={`w-72 py-2 px-10 font-medium bg-red-500 text-gray-100 rounded my-4`}
        >
          Delete
        </button>
      </div>
    </main>
  )
}

const mapStateToProps = (state) => {
  return { cities: state.cities.cities }
}

const mapDispatchToProps = {
  deleteCity: citiesActions.deleteCity,
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDelete)
