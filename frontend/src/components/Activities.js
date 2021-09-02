import { useEffect, useState } from "react"
import { connect } from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions"

const Activities = ({ allActivities, getActivities, itineraryId }) => {
  const activities = allActivities.filter(
    (activity) => activity.itineraryId === itineraryId
  )
  const [loading, setLoading] = useState(activities.length === 0)
  useEffect(() => {
    const addActivitiesToRedux = async () => {
      await getActivities(itineraryId)
      setLoading(false)
    }
    if (!activities.length) {
      addActivitiesToRedux()
    }
    // eslint-disable-next-line
  }, [])

  if (loading) return <Loading />
  return (
    <div
      className={`w-full min-h-1/2s flex flex-col gap-8 justify-center p-2 relative`}
    >
      <h3 className="text-center text-xl font-semibold">Activities</h3>
      <div className="w-full flex flex-wrap gap-3">
        {activities.length ? (
          activities.map((activity) => (
            <div
              key={activity._id}
              className="rounded w-full sm:w-1/3 md:w-1/4 flex-grow h-1/2s flex items-end"
              style={{
                backgroundImage: `url("${activity.pic}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="w-full bg-gray-900 text-gray-200 bg-opacity-80 h-10 rounded-b flex justify-center items-center">
                <p className="font-semibold opacity-80">
                  {activity.title.toUpperCase()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="w-full text-center text-lg">
            There's no activities yet.
          </p>
        )}
      </div>
    </div>
  )
}

const Loading = () => {
  return (
    <div className="px-5 flex items-center justify-center flex-grow py-5 transition duration-1000 dark:bg-gray-800 bg-white">
      <h1 className="flex gap-px text-center text-3xl dark:text-gray-100">
        <span className="animate-bounce">L</span>
        <span className="animate-bounce animation-delay-100">o</span>
        <span className="animate-bounce animation-delay-200">a</span>
        <span className="animate-bounce animation-delay-300">d</span>
        <span className="animate-bounce animation-delay-400">i</span>
        <span className="animate-bounce animation-delay-500">n</span>
        <span className="animate-bounce animation-delay-600">g</span>
        <span className="text-2xl font-black animate-bounce animation-delay-700">
          .
        </span>
        <span className="text-2xl font-black transition animate-bounce animation-delay-800">
          .
        </span>
        <span className="text-2xl font-black transition animate-bounce animation-delay-900">
          .
        </span>
      </h1>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { allActivities: state.itineraries.activities }
}

const mapDispatchToProps = {
  getActivities: itinerariesActions.getActivities,
}

export default connect(mapStateToProps, mapDispatchToProps)(Activities)
