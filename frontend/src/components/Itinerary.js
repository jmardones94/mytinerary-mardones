import React, { useState, useEffect } from "react"

const Itinerary = ({ itinerary }) => {
  const [visible, setVisible] = useState(false)
  const [ix, setIx] = useState(0)
  useEffect(() => {
    const interval = setTimeout(() => {
      setIx((ix + 1) % itinerary.photos.length)
    }, 5000)
    return () => {
      clearTimeout(interval)
    }
    // eslint-disable-next-line
  }, [ix])
  const dollars = []
  for (let i = 0; i < itinerary.price; i++) {
    dollars.push(1)
  }
  return (
    <div className="dark:bg-customblue bg-indigo-300 w-full rounded text-gray-900 dark:text-gray-200">
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex flex-col h-full w-full md:w-3/5 px-3 lg:px-10 py-2">
          <h2 className="py-3 text-lg font-medium">
            {itinerary.title.toUpperCase()}
          </h2>
          <hr />
          <div className="w-full py-3 flex justify-evenly items-center">
            <span className="flex items-center gap-1">
              <Clock />
              {itinerary.duration} hrs.
            </span>
            <span className="flex items-center gap-1">
              Price
              <span>
                {dollars.map((dollar, idx) => (
                  <DollarSign key={idx} />
                ))}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <HeartOutline />
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

      <div
        className={`${
          visible ? "block" : "hidden"
        } min-h-28 w-full rounded px-3 flex justify-center items-center`}
      >
        <p>This is the comments section. Currently under construction.</p>
      </div>
      <button
        type="button"
        className="text-white font-medium tracking-wide text-center rounded-b w-full py-2 bg-blue-900 relative"
        onClick={() => setVisible(!visible)}
      >
        {visible ? "View less" : "View more"}
        <span>
          {visible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block h-5 w-5 mx-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block h-5 w-5 mx-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
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
        {/* <p>This is an author description</p> */}
      </div>
    </div>
  )
}

// Icons

const DollarSign = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 inline-block text-green-600 dark:text-green-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   className="h-6 w-6 inline-block text-green-600 dark:text-green-400"
    //   viewBox="0 0 20 20"
    //   fill="currentColor"
    // >
    //   <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
    //   <path
    //     fillRule="evenodd"
    //     d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
    //     clipRule="evenodd"
    //   />
    // </svg>
  )
}

// eslint-disable-next-line
const HeartOutline = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 inline-block text-red-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  )
}

// eslint-disable-next-line
const HeartSolid = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 inline-block text-red-500"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const Clock = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

export default Itinerary
