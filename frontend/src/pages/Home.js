import Header from '../components/Header'
import MainHome from '../components/MainHome'
import Footer from '../components/Footer'

const Home = () => {
    const heroImg = require('../assets/travels.jpg')
    return(
        <div className="min-h-screen flex flex-col select-none">
            <Header heroImg={heroImg} />
            <MainHome />
            <Footer />
        </div>
    )
}

export default Home