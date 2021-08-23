import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Loading from "../components/Loading"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import Itinerary from "../components/Itinerary"
import { connect } from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions"

const MySwal = withReactContent(Swal)
const Toast = MySwal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  showCloseButton: true,
})

const City = (props) => {
  const [loading, setLoading] = useState(true)
  const { allItineraries, cities, getItineraries } = props
  const city =
    cities.find((city) => city._id === props.match.params.id) || false
  useEffect(() => {
    window.scrollTo(0, 0)
    const getData = async () => {
      if (
        !allItineraries.some(
          (itinerary) => itinerary.cityId === props.match.params.id
        )
      ) {
        try {
          const response = await getItineraries(props.match.params.id)
          if (response.success) {
            setLoading(false)
          } else {
            throw new Error("Error. Couldn't get the itineraries.")
          }
        } catch (err) {
          const e = err.message || "Server stops responding."
          console.error(e)
          Toast.fire({
            title: "Something went wrong.",
            icon: "error",
            text: "You will be redirected to Cities soon.",
          }).then(() => props.history.push("/cities"))
        }
      } else {
        setLoading(false)
      }
    }
    getData()
    // eslint-disable-next-line
  }, [])
  const cityItineraries = allItineraries.filter(
    (itinerary) => itinerary.cityId === props.match.params.id
  )
  if (loading) return <Loading />
  if (!city) return <CityNotFound />
  return (
    <main className="px-5 flex-grow md:px-28 py-5 transition duration-1000 dark:bg-gray-900 bg-gray-100">
      <section className="text-gray-900 dark:text-gray-200 pb-10">
        <div className="flex flex-col md:flex-row justify-between py-3 items-center">
          <div className="flex gap-5 items-center">
            <div
              className="h-12 w-12"
              style={{
                backgroundImage: `url("${city.countryFlag}")`,
                backgroundPositionY: "center",
                backgroundSize: "cover",
              }}
            ></div>
            <p className="uppercase text-xl md:text-2xl tracking-wide font-semibold">
              {city.name}, {city.country}.
            </p>
          </div>
          <div className="flex gap-2 items-center flex-row-reverse md:flex-row">
            <p className="text-lg md:text-2xl font-medium tracking-wide">
              {city.currencyCode}
            </p>
            <Currency symbol={city.currencySymbol} />
          </div>
        </div>
        <div
          className="h-56 md:h-96 rounded shadow-3xl"
          style={{
            backgroundImage: `url("${city.src}")`,
            backgroundPositionY: "center",
            backgroundSize: "cover",
          }}
        ></div>

        <div className="pt-10 md:px-5 text-lg text-justify tracking-normal leading-relaxed">
          {city.description}
        </div>
      </section>

      {cityItineraries.length ? (
        <section className="md:px-5 my-5 flex flex-col gap-8">
          <h1 className="tracking-wide font-semibold text-xl md:text-4xl text-center uppercase dark:text-gray-200">
            {city.name}{" "}
            <span className="tracking-wider normal-case font-silt">
              MyTineraries
            </span>
          </h1>
          {cityItineraries.map((itinerary) => (
            <Itinerary key={itinerary._id} itinerary={itinerary} />
          ))}
        </section>
      ) : (
        <NoItinerariesFound />
      )}

      <Link className="flex w-full justify-center m-3" to="/cities">
        <button className="transform active:scale-95 text-center text-gray-100 px-6 py-3 w-60 bg-red-500 rounded">
          Back to Cities
        </button>
      </Link>
    </main>
  )
}

const NoItinerariesFound = () => {
  return (
    <section className="py-3 gap-3 flex flex-col items-center text-center justify-center text-gray-900 dark:text-gray-200">
      <h2 className="text-xl font-medium md:text-2xl">
        We have no itineraries for this city yet{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block h-6 w-6 md:h-10 md:w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </h2>
      <p className="font-medium text-lg">Come back soon.</p>
    </section>
  )
}

const CityNotFound = () => {
  return (
    <div className="text-xl dark:text-gray-300 px-5 flex flex-col gap-5 items-center justify-center flex-grow md:px-28 py-5 transition duration-1000 dark:bg-gray-900 bg-gray-100">
      <h1 className="text-center font-medium text-3xl dark:text-gray-100">
        City not found.
      </h1>
      <div className="text-start px-4">
        <p className="font-medium">This can be due to:</p>
        <ul className="list-disc my-2">
          <li>You followed a broken link.</li>
          <li>We broke something.</li>
          <li>The developer didn't do the job. Again.</li>
        </ul>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <Link className="flex w-full justify-center m-3" to="/cities">
          <button className="transform active:scale-95 text-xl text-center text-gray-100 px-6 py-3 w-72 bg-red-500 rounded">
            Back to Cities
          </button>
        </Link>
        <Link className="flex w-full justify-center m-3" to="/cities">
          <button className="transform active:scale-95 text-xl text-center text-gray-100 px-6 py-3 w-72 bg-green-500 rounded">
            Back to Cities in green.
          </button>
        </Link>
      </div>
    </div>
  )
}

const Currency = ({ symbol }) => {
  switch (symbol) {
    case "£":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a3 3 0 00-3 3v2H7a1 1 0 000 2h1v1a1 1 0 01-1 1 1 1 0 100 2h6a1 1 0 100-2H9.83c.11-.313.17-.65.17-1v-1h1a1 1 0 100-2h-1V7a1 1 0 112 0 1 1 0 102 0 3 3 0 00-3-3z"
            clipRule="evenodd"
          />
        </svg>
      )
    case "€":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H10a1 1 0 100-2H8.017a7.36 7.36 0 010-1H10a1 1 0 100-2H8.472c.08-.185.167-.36.264-.521z"
            clipRule="evenodd"
          />
        </svg>
      )
    case "¥":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7.858 5.485a1 1 0 00-1.715 1.03L7.633 9H7a1 1 0 100 2h1.834l.166.277V12H7a1 1 0 100 2h2v1a1 1 0 102 0v-1h2a1 1 0 100-2h-2v-.723l.166-.277H13a1 1 0 100-2h-.634l1.492-2.486a1 1 0 10-1.716-1.029L10.034 9h-.068L7.858 5.485z"
            clipRule="evenodd"
          />
        </svg>
      )
    case "₹":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 011.732 1H7a1 1 0 100 2h2.732A2 2 0 018 11H7a1 1 0 00-.707 1.707l3 3a1 1 0 001.414-1.414l-1.483-1.484A4.008 4.008 0 0011.874 10H13a1 1 0 100-2h-1.126a3.976 3.976 0 00-.41-1H13a1 1 0 100-2H7z"
            clipRule="evenodd"
          />
        </svg>
      )
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
            clipRule="evenodd"
          />
        </svg>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities.cities,
    allItineraries: state.itineraries.itineraries,
  }
}

const mapDispatchToProps = {
  getItineraries: itinerariesActions.getItineraries,
}

export default connect(mapStateToProps, mapDispatchToProps)(City)
