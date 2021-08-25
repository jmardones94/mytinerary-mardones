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

const Itinerary = ({ itinerary }) => {
  const [visible, setVisible] = useState(false)
  const [ix, setIx] = useState(0)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    const interval = setTimeout(() => {
      setIx((ix + 1) % itinerary.photos.length)
    }, 5000)
    return () => {
      clearTimeout(interval)
    }
    // eslint-disable-next-line
  }, [ix])
  return (
    <div className="dark:bg-gray-800 bg-white w-full rounded text-gray-900 dark:text-gray-200">
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex flex-col h-full w-full md:w-3/5 px-3 lg:px-10 py-2">
          <h2 className="py-3 text-lg font-medium">
            {itinerary.title.toUpperCase()}
          </h2>
          <hr />
          <div className="w-full py-3 flex justify-evenly items-center">
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
            <span className="flex items-center gap-1">
              {/* Change true to like-user condition */}
              {true ? (
                <HearIconOutline className="inline-block h-6 w-6 text-red-500" />
              ) : (
                <HeartIconSolid className="inline-block h-6 w-6 text-red-500" />
              )}

              {itinerary.likes}
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-sm italic font-thin text-gray-700 dark:text-gray-300">
            {itinerary.hashtags.map((hashtag) => (
              <span key={hashtag}>#{hashtag}</span>
            ))}
          </div>
          <Author author={itinerary.author} />
        </div>
        <div
          className="min-h-52 md:min-h-full w-full md:w-2/5 rounded-t md:rounded-bl md:rounded-tl-none"
          style={{
            backgroundImage: `url("${itinerary.photos[ix]}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* PHOTO */}
        </div>
      </div>

      {visible && <Comments />}
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
    <div className="flex-grow flex flex-col md:flex-row gap-3 md:gap-8 py-5 items-center justify-center">
      <div
        className="rounded-full bg-yellow-300 h-24 w-24"
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

export default Itinerary
