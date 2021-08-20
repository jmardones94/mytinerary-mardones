// import axios from "axios"
import React from "react"
import { Link } from "react-router-dom"
// import FetchError from "../components/FetchError"
import Loading from "../components/Loading"
// import Swal from "sweetalert2"
// import withReactContent from "sweetalert2-react-content"
import Itinerary from "../components/Itinerary"
import { connect } from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions"
import { useEffect } from "react"
// import citiesActions from "../redux/actions/citiesActions"

// const MySwal = withReactContent(Swal)
// const Toast = MySwal.mixin({
//   toast: true,
//   position: "bottom",
//   showConfirmButton: false,
//   timer: 5000,
//   timerProgressBar: true,
//   showCloseButton: true,
// })

const City = (props) => {
  // const [city, setCity] = useState({})
  // const [loading, setLoading] = useState(true)
  // const [fetchOk, setFetchOk] = useState(null)
  // const [itineraries, setItineraries] = useState([])
  const { itineraries, cities, getItineraries } = props
  const city = cities.find((city) => city._id === props.id) || {}
  useEffect(() => {
    window.scrollTo(0, 0)
    getItineraries()
    // eslint-disable-next-line
  }, [])
  // useEffect(() => {
  //   city
  // })
  // useEffect(() => {
  //   window.scrollTo(0, 0)
  //   axios
  //     .get(`http://localhost:4000/api/city/${props.id}`)
  //     .then((res) => {
  //       if (res.data.success) {
  //         setCity(res.data.response)
  //         setFetchOk(true)
  //       } else {
  //         throw new Error("Internal server error.")
  //       }
  //     })
  //     .catch((err) => {
  //       setFetchOk(false)
  //       const e = err.message || "Server stops responding."
  //       console.error(e)
  //       Toast.fire({
  //         title: "Something went wrong.",
  //         icon: "error",
  //         text: "You will be redirected to Home soon.",
  //       }).then(() => props.history.push("/"))
  //     })
  //     .finally(() => setLoading(false))

  //   axios
  //     .get("http://localhost:4000/api/itineraries")
  //     .then((res) => setItineraries(res.data.response))
  //     .catch((e) => console.error(e))
  // eslint-disable-next-line
  // }, [])
  // if (loading) return <Loading />
  // if (!fetchOk) return <FetchError />
  if (!Object.keys(city).length) return <Loading />
  return (
    <main className="px-5 flex-grow md:px-28 py-5 transition duration-1000 dark:bg-gray-900 bg-gray-100">
      <section>
        <div
          className="h-56 md:h-96 rounded shadow-3xl"
          style={{
            backgroundImage: `url("${city.src}")`,
            backgroundPositionY: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <h1 className="p-5 tracking-wide font-semibold text-xl md:text-3xl text-center uppercase dark:text-gray-200">
          {city.name}{" "}
          <span className="tracking-wider normal-case font-silt">
            MyTineraries
          </span>
        </h1>
      </section>

      <section className="md:px-5 flex flex-col gap-8">
        {itineraries.map((itinerary) => (
          <Itinerary key={itinerary._id} itinerary={itinerary} />
        ))}
      </section>

      <Link className="flex w-full justify-center m-3" to="/cities">
        <button className="transform active:scale-95 text-center text-gray-100 px-3 py-2 bg-red-500 rounded">
          Back to Cities
        </button>
      </Link>
    </main>
  )
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities.cities,
    itineraries: state.itineraries.itineraries,
  }
}

const mapDispatchToProps = {
  getItineraries: itinerariesActions.getItineraries,
}

export default connect(mapStateToProps, mapDispatchToProps)(City)
