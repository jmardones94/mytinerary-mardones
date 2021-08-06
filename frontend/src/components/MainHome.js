import { Link } from "react-router-dom"
import Carousel from "./Carousel"

const MainHome = () => {
    const citiesData = [
        [
            {src:require('../assets/ciudades/sydney.jpg'),alt:'Sydney',city:'Sydney'},
            {src:require('../assets/ciudades/toronto.jpg'),alt:'Toronto',city:'Toronto'},
            {src:require('../assets/ciudades/london.jpg'),alt:'London',city:'London'},
            {src:require('../assets/ciudades/berlin.jpg'),alt:'Berlin',city:'Berlin'}
        ],
        [
            {src:require('../assets/ciudades/venice.jpg'),alt:'Venice',city:'Venice'},
            {src:require('../assets/ciudades/madrid.jpg'),alt:'Madrid',city:'Madrid'},
            {src:require('../assets/ciudades/torresdelpaine.jpg'),alt:'Torres del Paine',city:'Torres del Paine'},
            {src:require('../assets/ciudades/buenosaires.jpg'),alt:'Buenos Aires',city:'Buenos Aires'}
        ],[
            {src:require('../assets/ciudades/parislouvre.jpg'),alt:'Paris',city:'Paris'},
            {src:require('../assets/ciudades/rome.jpg'),alt:'Rome',city:'Rome'},
            {src:require('../assets/ciudades/stockholm.jpg'),alt:'Stockholm',city:'Stockholm'},
            {src:require('../assets/ciudades/tokyo.jpg'),alt:'Tokyo',city:'Tokyo'},
        ]
    ]
    return (
        <div className="flex-grow">
            <div className="h-1/4s w-full bg-blue-300 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col md:flex-row gap-4 items-center justify-center">
                <p className="text-2xl text-semibold">Your dream trip starts</p>
                <Link className="px-6 py-3 bg-red-600 rounded-2xl font-semibold" to="/cities"><p className="text-xl">Here!</p></Link>
            </div>
            <Carousel citiesData={citiesData}/>
        </div>
    )
}

export default MainHome