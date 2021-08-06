import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'

const Home = () => {
    const heroImg = require('../assets/travels.jpg')
    return(
        <div className="min-h-screen flex flex-col">
            <Header heroImg={heroImg} leftHeroContent={true}/>
            <Main />
            <p>Estoy en Home</p>
            <Footer />
        </div>
    )
}

export default Home