import {
  ClockIcon,
  HeartIcon as HearIconOutline,
  CurrencyDollarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline"
import { default as HeartIconSolid } from "@heroicons/react/solid/HeartIcon"
import React, { useState, useEffect } from "react"
import Comments from "./Comments"
import { connect } from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions"
import Activities from "./Activities"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)
const Toast = MySwal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  showCloseButton: true,
})

const Itinerary = ({ itinerary, user, addLike, removeLike }) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // useEffect(() => {
  //   const interval = setTimeout(() => {
  //     setIx((ix + 1) % itinerary.photos.length)
  //   }, 5000)
  //   return () => {
  //     clearTimeout(interval)
  //   }
  //   // eslint-disable-next-line
  // }, [ix])
  const likesHandler = async () => {
    if (!user) {
      Toast.fire({
        title: "You have to log in to like an itinerary!",
        icon: "warning",
      })
      return false
    }
    if (itinerary.likes.includes(user._id)) {
      // eslint-disable-next-line
      const res = await removeLike(itinerary._id, user._id)
      // validate
    } else {
      // eslint-disable-next-line
      const res = await addLike(itinerary._id, user._id)
      // validate
    }
  }
  return (
    <div className="dark:bg-gray-800 bg-white w-full rounded text-gray-900 dark:text-gray-200">
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex flex-col min-h-full w-full md:w-3/5 px-6 md:px-8 lg:px-10 py-2 md:py-5">
          <h2 className="pb-3 text-xl font-medium">
            {itinerary.title.toUpperCase()}
          </h2>
          <hr />
          <div className="w-full flex-grow py-3 flex justify-evenly items-center">
            <span className="flex items-center gap-1">
              <ClockIcon className="inline-block h-6 w-6" />
              {itinerary.duration} hrs.
            </span>
            <span className="flex items-center gap-1">
              Price
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
            <span
              onClick={likesHandler}
              className="cursor-pointer flex items-center gap-1"
            >
              {/* Change true to like-user condition */}
              {!user || !itinerary.likes.includes(user._id) ? (
                <HearIconOutline className="inline-block h-6 w-6 text-red-500" />
              ) : (
                <HeartIconSolid className="inline-block h-6 w-6 text-red-500" />
              )}

              {itinerary.likes.length}
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-sm italic font-thin text-gray-700 dark:text-gray-300">
            {itinerary.hashtags.map((hashtag) => (
              <span key={hashtag}>#{hashtag}</span>
            ))}
          </div>
        </div>
        <Author author={itinerary.author} />
      </div>

      {visible && (
        <div className="flex flex-col">
          <Activities itineraryId={itinerary._id} />
          <Comments itineraryId={itinerary._id} />
        </div>
      )}
      <button
        type="button"
        className="text-white font-medium tracking-wide text-center rounded-b w-full py-2 bg-gray-900 dark:bg-black relative"
        onClick={() => setVisible(!visible)}
      >
        {visible ? "View Less" : "View More"}
        <span>
          {visible ? (
            <ChevronUpIcon className="inline-block h-5 w-5 mx-2" />
          ) : (
            <ChevronDownIcon className="inline-block h-5 w-5 mx-2" />
          )}
        </span>
      </button>
    </div>
  )
}

// Author
const Author = ({ author }) => {
  return (
    <div className="flex-grow flex flex-col gap-3 py-3 md:py-5 items-center justify-center">
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
    user: state.users.user,
  }
}

const mapDispatchToProps = {
  addLike: itinerariesActions.addLike,
  removeLike: itinerariesActions.removeLike,
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)
