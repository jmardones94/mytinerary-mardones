// import { Link } from "react-router-dom"
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
            {/* <div className="h-1/4s w-full transition duration-1000 bg-blue-900 dark:bg-gray-900 text-gray-900 dark:text-gray-200 flex flex-col md:flex-row gap-4 items-center justify-center">
                <p className="text-xl font-semibold tracking-wider">Your dream travel starts</p>
                <Link className="px-6 py-1 border-2 border-red-600 hover:bg-red-600 rounded text-red-600 hover:text-red-200" to="/cities"><p className="inline tracking-wider text-md hover:shadow-2xl font-medium">HERE <svg className="inline transform rotate-45 -translate-y-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg></p></Link>
            </div> */}
            <Carousel citiesData={citiesData} />
        </div>
    )
}

export default MainHome