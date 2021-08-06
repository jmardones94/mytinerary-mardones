import Header from '../components/Header'
import MainCities from '../components/MainCities'
import Footer from '../components/Footer'

const Cities = ({heroImg}) => {
    return(
        <div className="min-h-screen flex flex-col">
            <Header heroImg={heroImg} />
            <MainCities />
            <Footer />
        </div>
    )
}

export default Cities