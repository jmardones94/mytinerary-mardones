import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Loading from "../components/Loading"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import Itinerary from "../components/Itinerary"
import { connect } from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions"
import {
  CurrencyEuroIcon,
  CurrencyPoundIcon,
  CurrencyRupeeIcon,
  CurrencyDollarIcon,
  CurrencyYenIcon,
  EmojiSadIcon,
} from "@heroicons/react/solid"

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
    <main className="px-5 flex-grow md:px-10 lg:px-28 py-5 transition duration-1000 dark:bg-gray-900 bg-gray-100">
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

        <div className="pt-10 md:px-5 text-lg text-justify tracking-normal leading-normal">
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

      <Link className="flex w-full justify-center my-3" to="/cities">
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
        <EmojiSadIcon className="inline-block h-6 w-6 md:h-10 md:w-10" />
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
      return <CurrencyPoundIcon className="h-12 w-12" />
    case "€":
      return <CurrencyEuroIcon className="h-12 w-12" />
    case "¥":
      return <CurrencyYenIcon className="h-12 w-12" />
    case "₹":
      return <CurrencyRupeeIcon className="h-12 w-12" />
    default:
      return <CurrencyDollarIcon className="h-12 w-12" />
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
