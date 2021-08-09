import Hero from '../components/Hero'
import Carousel from '../components/Carousel'
import { useEffect } from 'react'

const Home = () => {
    useEffect(() => {
        window.scrollTo(0,0)
    }, [])
    const img = require('../assets/hero.png')
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

    return(
        <div className="min-h-screen flex flex-col select-none">
            <Hero heroImg={img} />
            <div className="flex-grow">
                <Carousel citiesData={citiesData} />
            </div>
        </div>
    )
}

export default Home