import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'

const Home = ({heroImg}) => {
    return(
        <div className="min-h-screen flex flex-col">
            <Header heroImg={heroImg} />
            <Main />
            <p>Estoy en Home</p>
            <Footer />
        </div>
    )
}

export default Home