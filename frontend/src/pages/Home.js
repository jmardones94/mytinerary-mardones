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
            {src:require('../assets/cities/sydney.jpg'),alt:'Sydney',city:'Sydney'},
            {src:require('../assets/cities/toronto.jpg'),alt:'Toronto',city:'Toronto'},
            {src:require('../assets/cities/london.jpg'),alt:'London',city:'London'},
            {src:require('../assets/cities/berlin.jpg'),alt:'Berlin',city:'Berlin'}
        ],
        [
            {src:require('../assets/cities/venice.jpg'),alt:'Venice',city:'Venice'},
            {src:require('../assets/cities/madrid.jpg'),alt:'Madrid',city:'Madrid'},
            {src:require('../assets/cities/torresdelpaine.jpg'),alt:'Torres del Paine',city:'Torres del Paine'},
            {src:require('../assets/cities/buenosaires.jpg'),alt:'Buenos Aires',city:'Buenos Aires'}
        ],[
            {src:require('../assets/cities/parislouvre.jpg'),alt:'Paris',city:'Paris'},
            {src:require('../assets/cities/rome.jpg'),alt:'Rome',city:'Rome'},
            {src:require('../assets/cities/stockholm.jpg'),alt:'Stockholm',city:'Stockholm'},
            {src:require('../assets/cities/tokyo.jpg'),alt:'Tokyo',city:'Tokyo'},
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