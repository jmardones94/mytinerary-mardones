import React, { useEffect } from 'react'

export default function City({ city }) {
    useEffect(() => {
        window.scrollTo(0,0)
    },[])
    return (
        <div className="px-5 md:px-28 py-5 transition duration-1000 dark:bg-gray-900 bg-gray-100">
            <div className="h-56 md:h-96 rounded shadow-3xl"
                style={{backgroundImage: `url("${city.src.default}")`,
                backgroundPositionY: 'center',
                backgroundSize: 'cover'}}>
            </div>
            <h1 className="p-5 tracking-wide font-semibold text-xl md:text-3xl text-center uppercase dark:text-gray-200">{city.name} <span className="tracking-wider normal-case font-silt">MyTineraries</span></h1>
        </div>
    )
}
