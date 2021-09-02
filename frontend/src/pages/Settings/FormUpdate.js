import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import citiesActions from "../../redux/actions/citiesActions"
import FormSelect from "./FormSelect"
import { connect } from "react-redux"
import axios from "axios"

const MySwal = withReactContent(Swal)
const Toast = MySwal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})

const FormUpdate = (props) => {
  const cities = [...props.cities] || []
  const [selectedName, setSelectedName] = useState("")
  const [newData, setNewData] = useState({})
  const [selectedCountry, setSelectedCountry] = useState(newData?.country || "")
  const [countries, setCountries] = useState([])
  const inputHandler = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    })
  }
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

  const handleUpdateClick = () => {
    if (
      !(
        newData.name &&
        selectedCountry &&
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
      props.updateCity(cities.find((city) => city.name === selectedName)._id, {
        ...newData,
        country: selectedCountry,
      })
      setSelectedName("")
    }
  }
  const handleSelect = (e) => {
    setSelectedName(e)
    setNewData({ ...cities.find((city) => city.name === e) })
    setSelectedCountry(cities.find((city) => city.name === e).country)
  }

  return (
    <div className="relative flex justify-center flex-col items-center transition duration-1000 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 flex-grow">
      <div className="flex justify-center gap-3 h-16 py-3">
        <button
          type="button"
          className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-100 w-20 text-center py-1 px-3 rounded "
          onClick={() => props.setSection("add")}
        >
          Add
        </button>
        <button
          type="button"
          className="bg-yellow-500 text-gray-100 py-1 px-3 w-20 text-center rounded "
          onClick={() => props.setSection("update")}
        >
          Update
        </button>
        <button
          type="button"
          className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-gray-100 w-20 text-center py-1 px-3 rounded "
          onClick={() => props.setSection("delete")}
        >
          Delete
        </button>
      </div>
      <h2 className="text-center text-lg mb-3">
        Select the city you want to update
      </h2>
      <div className="w-72 z-50 flex justify-center">
        <FormSelect
          selected={selectedName}
          setSelected={handleSelect}
          data={cities}
          itemName="City"
        />
      </div>
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
            <div className="flex justify-between items-center w-100">
              <label className="font-medium" htmlFor="country">
                Country
              </label>
              <div className="w-48 z-30 flex justify-center">
                <FormSelect
                  data={countries}
                  name="country"
                  selected={selectedCountry}
                  setSelected={setSelectedCountry}
                  itemName="Country"
                />
                {/* <ErrorMessage content={errors.countries} /> */}
              </div>
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
    </div>
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
