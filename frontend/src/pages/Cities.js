import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'

const Cities = ({heroImg}) => {
    return(
        <div className="min-h-screen flex flex-col">
            <Header heroImg={heroImg} leftHeroContent={true}/>
            <Main />
            <p>Estoy en Cities</p>
            <Footer />
        </div>
    )
}

export default Cities