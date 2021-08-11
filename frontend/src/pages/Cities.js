import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const Cities = ({ citiesData }) => {
    const [renderedCities, setRenderedCities] = useState(citiesData)
    const searchInput = useRef('')

    const handleSearch = () => {
        const searchedCity = searchInput.current.value.toLowerCase().trim()
        setRenderedCities(searchedCity 
                        ? citiesData.filter(city => city.name.toLowerCase().startsWith(searchedCity))
                        : citiesData)
    }

    // const searchImg = require('../assets/searchingtraveller.png')
    
    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    return(
    <>
        <div className="transition duration-1000 bg-gray-100 w-full px-5 md:px-20 flex flex-wrap justify-center dark:bg-gray-900">
            <div className="relative py-10 flex items-center w-5/6 md:w-1/3">
                <svg className="dark:text-blue-500 text-red-600 w-5 h-5 absolute left-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                <input className="transition duration-1000 dark:bg-gray-600 dark:text-gray-300 dark:placeholder-gray-300 focus:outline-none focus:ring-1 focus:border-none dark:focus:ring-blue-500 focus:ring-red-500 rounded px-10 py-3 w-full border-2 dark:border-blue-500 border-red-500 placeholder-red-500" onChange={handleSearch} type="text" placeholder="Search a city..." ref={searchInput}>
                </input>
            </div>
            {/* <div className="h-96 w-full md:w-2/3" style={{backgroundImage:`url("${searchImg.default}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'}}></div> */}
        </div>
        <div className="transition duration-1000 relative bg-gray-100 flex flex-wrap gap-3 justify-center dark:bg-gray-900 py-5 px-2 xs:px-10 md:px-20">
            {renderedCities.map((city, index) => (
                <div key={city._id} className={`rounded flex-grow transform hover:scale-102 relative inline-block w-full sm:w-4/5 md:w-${((index % 3)===0 || (index % 3) === 1) ? '2/5' : '1/4'} h-40 xs:h-64`}
                     style={{backgroundImage:`url("${city.src.default}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'}}>       
                    <Link to={`/itineraries/${city._id}`} >
                        <div className="sm:hover:opacity-40 flex items-center justify-center absolute bg-black opacity-40 sm:opacity-50 sm:opacity-0 w-full h-full">
                            <p className="uppercase font-semibold text-white text-center text-2xl md:text-4xl">{city.name}</p>
                        </div>
                    </Link>
                </div>
                )
            )}
        </div>
    </>
    )
}

export default Cities