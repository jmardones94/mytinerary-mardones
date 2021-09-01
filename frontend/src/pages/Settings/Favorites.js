import settingsActions from "../../redux/actions/settingsActions"
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import { HeartIcon } from "@heroicons/react/solid"
import { ClockIcon, CurrencyDollarIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"
import Loading from "../../components/Loading"

const Favorites = (props) => {
  const [itineraries, setItineraries] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getFavs = async () => {
      const res = await props.getFavorites()
      setItineraries(res.response)
      setLoading(false)
    }
    getFavs()
    // eslint-disable-next-line
  }, [])
  if (loading) return <Loading />
  if (!itineraries.length)
    return (
      <div className="min-h-full">
        <p className="text-xl text-center">
          You don't have any itinerary in favorites yet.
        </p>
      </div>
    )
  return (
    <div className="flex flex-col w-full gap-3">
      {itineraries.map((itinerary) => (
        <Itinerary
          key={itinerary._id}
          itinerary={itinerary}
          city={props.cities.find((city) => city._id === itinerary.cityId)}
        />
      ))}
    </div>
  )
}

const Itinerary = ({ itinerary, city }) => {
  console.log(city)
  return (
    <Link className="flex-grow" to={`/itineraries/${city._id}`}>
      <div className="dark:bg-gray-800 bg-white w-full rounded text-gray-900 dark:text-gray-200 py-3">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="flex flex-col min-h-full justify-evenly w-full md:w-3/5 px-6 md:px-8 lg:px-10">
            <h2 className="pb-3 text-lg font-medium">
              {itinerary.title.toUpperCase()}
            </h2>
            <hr />
            <div className="w-full py-px flex justify-evenly items-center">
              <span className="flex items-center gap-1">
                <ClockIcon className="inline-block h-6 w-6" />
                {itinerary.duration} hrs.
              </span>

              <span className="flex items-center gap-1">
                <HeartIcon className="inline-block h-6 w-6 text-red-500" />
              </span>
              <span className="flex items-center gap-1">
                <span>
                  {Array(itinerary.price)
                    .fill(1)
                    .map((n, idx) => (
                      <CurrencyDollarIcon
                        key={idx}
                        className="h-6 w-6 inline-block text-green-600 dark:text-green-600"
                      />
                    ))}
                </span>
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-sm italic font-thin text-gray-700 dark:text-gray-300">
              {itinerary.hashtags.map((hashtag) => (
                <span key={hashtag}>#{hashtag}</span>
              ))}
            </div>
            <div className="text-center text-lg font-medium">
              {city.name.toUpperCase()}
            </div>
          </div>
          <Author author={itinerary.author} />
        </div>
      </div>
    </Link>
  )
}

// Author
const Author = ({ author }) => {
  return (
    <div className="flex-grow flex flex-col gap-3 items-center justify-center">
      <div
        className="rounded-full bg-yellow-300 h-32 w-32"
        style={{
          backgroundImage: `url("${author.photo}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div>
        <p className="font-semibold">{author.name}</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities.cities,
  }
}

const mapDispatchToProps = {
  getFavorites: settingsActions.getFavorites,
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
