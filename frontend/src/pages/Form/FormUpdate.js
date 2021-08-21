import { useState } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import citiesActions from "../../redux/actions/citiesActions"
import FormSelect from "./FormSelect"
import { connect } from "react-redux"

const MySwal = withReactContent(Swal)
const Toast = MySwal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})

const FormUpdate = (props) => {
  // const [cities, setCities] = useState([])
  const cities = [...props.cities] || []
  // const [updateCount, setUpdateCount] = useState(0)
  const [selectedName, setSelectedName] = useState("")
  const [newData, setNewData] = useState(null)
  // const [loading, setLoading] = useState(true)
  // const [fetchOk, setFetchOk] = useState(null)

  const inputHandler = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    })
  }

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
  // }, [updateCount])

  // const handleUpdateClick = async () => {
  //   if (
  //     !(newData.name && newData.country && newData.src && newData.currencyCode)
  //   ) {
  //     Toast.fire({
  //       icon: "error",
  //       title: "All fields are required!",
  //     })
  //   } else {
  //     try {
  //       const cityId = cities.find((city) => city.name === selectedName)._id
  //       const res = await axios.put(
  //         `http://localhost:4000/api/city/${cityId}`,
  //         newData
  //       )
  //       if (res.data.success) {
  //         Toast.fire({
  //           title: `${newData.name} successfully updated.`,
  //           icon: "success",
  //         })
  //         setUpdateCount(updateCount + 1)
  //         setSelectedName("")
  //       } else {
  //         console.error(res.data.error)
  //         throw new Error(
  //           "Our database couldn't process your request. Please try again later."
  //         )
  //       }
  //     } catch (e) {
  //       Toast.fire({
  //         title: e.message,
  //         icon: "error",
  //       })
  //     }
  //   }
  // }

  const handleUpdateClick = () => {
    if (
      !(
        newData.name &&
        newData.country &&
        newData.src &&
        newData.currencyCode &&
        newData.description
      )
    ) {
      Toast.fire({
        icon: "error",
        title: "All fields are required!",
      })
    } else {
      //make dispatch
      props.updateCity(
        cities.find((city) => city.name === selectedName)._id,
        newData
      )
      setSelectedName("")
    }
  }

  const handleSelect = (e) => {
    setSelectedName(e)
    setNewData({ ...cities.find((city) => city.name === e) })
  }

  return (
    <main className="relative py-10 flex justify-center flex-col items-center px-5 md:px-20 transition duration-1000 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 flex-grow">
      <div className="flex gap-3 absolute left-2 top-2">
        <Link
          className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-100 w-20 text-center py-1 px-3 rounded "
          to="/form/add"
        >
          Add
        </Link>
        <Link
          className="bg-yellow-500 text-gray-100 py-1 px-3 w-20 text-center rounded "
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
      <h2 className="text-center text-lg mb-3">
        Select the city you want to update
      </h2>
      <FormSelect
        selected={selectedName}
        setSelected={handleSelect}
        cities={cities}
      />
      {selectedName && (
        <div className="mt-10 w-full flex flex-col items-center gap-3">
          <div
            className="flex flex-col gap-3 w-full"
            style={{ maxWidth: "400px" }}
          >
            <div className="flex justify-between w-100">
              <label className="font-medium" htmlFor="name">
                City name
              </label>
              <input
                name="name"
                className="px-2 focus:outline-none transform focus:scale-105 rounded text-black border-gray-500 border dark:border-gray-200"
                type="text"
                placeholder="New York"
                onChange={inputHandler}
                value={newData.name}
                required
              ></input>
            </div>
            <div className="flex justify-between w-100">
              <label className="font-medium" htmlFor="country">
                Country
              </label>
              <input
                className="px-2 focus:outline-none transform focus:scale-105 rounded text-black border-gray-500 border dark:border-gray-200"
                name="country"
                type="text"
                placeholder="United States"
                onChange={inputHandler}
                value={newData.country}
              ></input>
            </div>
            <div className="flex justify-between w-100">
              <label className="font-medium" htmlFor="src">
                Photo
              </label>
              <input
                className="px-2 focus:outline-none transform focus:scale-105 rounded text-black border-gray-500 border dark:border-gray-200"
                name="src"
                type="text"
                placeholder="https://example.url.com"
                onChange={inputHandler}
                value={newData.src}
              ></input>
            </div>
            <div className="flex justify-between w-100">
              <label className="font-medium" htmlFor="currencyCode">
                Currency Code
              </label>
              <input
                className="px-2 focus:outline-none transform focus:scale-105 rounded text-black border-gray-500 border dark:border-gray-200"
                name="currencyCode"
                type="text"
                placeholder="USD"
                onChange={inputHandler}
                value={newData.currencyCode}
                maxLength="3"
              ></input>
            </div>
            <div className="flex justify-between w-100">
              <label className="font-medium" htmlFor="country">
                Description
              </label>
              <input
                className="px-2 focus:outline-none transform focus:scale-105 rounded text-black border-gray-500 border dark:border-gray-200"
                name="description"
                type="text"
                placeholder="It's a really fun place!"
                onChange={inputHandler}
                value={newData.description}
              ></input>
            </div>
            <button
              onClick={handleUpdateClick}
              className="transform active:scale-95 py-2 px-10 w-full mt-3 font-medium bg-yellow-500 text-gray-100 rounded"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities.cities,
  }
}

const mapDispatchToProps = {
  updateCity: citiesActions.updateCity,
}

export default connect(mapStateToProps, mapDispatchToProps)(FormUpdate)
