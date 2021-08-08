import Hero from '../components/Hero'
import MainHome from '../components/MainHome'

const Home = () => {
    const img = require('../assets/hero.png')
    return(
        <div className="min-h-screen flex flex-col select-none">
            <Hero heroImg={img} />
            <MainHome />
        </div>
    )
}

export default Home