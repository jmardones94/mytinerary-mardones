import Hero from '../components/Hero'
import MainHome from '../components/MainHome'

const Home = () => {
    const heroImg = require('../assets/rsz_1airplane.png')
    return(
        <div className="min-h-screen flex flex-col select-none">
            <Hero heroImg={heroImg} />
            <MainHome />
        </div>
    )
}

export default Home