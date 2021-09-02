import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const Carousel = ({ cities }) => {
  const [index, setIndex] = useState(0)
  const [citiesData, setCitiesData] = useState([[], [], []])
  useEffect(() => {
    var slider = setTimeout(() => {
      setIndex((index + 1) % 3)
    }, 5000)
    return () => {
      clearTimeout(slider)
    }
  }, [index])

  useEffect(() => {
    setCitiesData([0, 1, 2].map((i) => [...cities.slice(4 * i, 4 * (i + 1))]))
  }, [cities])
  return (
    <section className="transition duration-1000 h-carousel bg-gray-100 dark:bg-gray-900 md:h-screen w-100 flex flex-col items-center py-20 justify-center">
      <h2 className="text-3xl text-gray-900 dark:text-gray-200 md:text-4xl mb-8 mt-4 font-semibold">
        Popular
        <span className="font-silt tracking-wider"> MyTineraries</span>
      </h2>
      <div className="h-5/6 w-4/5 flex flex-wrap gap-2 p-2 relative">
        <span
          onClick={() => setIndex((((index - 1) % 3) + 3) % 3)}
          className="hover:text-gray-700 cursor-pointer dark:text-gray-100 absolute top-1/2 transform -translate-y-1/2 -translate-x-8"
        >
          <ChevronLeftIcon className="w-8 h-8" />
        </span>
        {citiesData[index].length ? (
          citiesData[index].map(({ src, name, _id }) => {
            return (
              <Link
                to={`/itineraries/${_id}`}
                className="rounded w-full md:w-1/3 min-h-1/3 flex items-end flex-grow transform hover:scale-102 transition duration-200"
                key={_id}
                style={{
                  backgroundImage: `url("${src}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="w-full h-1/5 m-2 rounded-md bg-black opacity-60 flex items-center justify-center">
                  <p className="text-white font-semibold text-lg">{name}</p>
                </div>
              </Link>
            )
          })
        ) : (
          <div className="w-full font-semibold text-xl flex justify-center items-center">
            <h3 className="text-center dark:text-gray-100">
              We couldn't load the cities. Please try again later.
            </h3>
          </div>
        )}
        <span
          onClick={() => setIndex((index + 1) % 3)}
          className="cursor-pointer dark:text-gray-100 absolute top-1/2 -right-6 transform -translate-y-1/2"
        >
          <ChevronRightIcon className="w-8 h-8" />
        </span>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => {
  return { cities: state.cities.cities }
}

export default connect(mapStateToProps)(Carousel)
