import Footer from '../components/Footer'
import Header from '../components/Header'

const E404 = ({heroImg}) => {
    return(
        <div className="min-h-screen flex flex-col">
            <Header heroImg={heroImg} />
            <main className="flex-grow flex items-center justify-center"><h1>Error 404. Page not found.</h1></main> 
            <Footer />
        </div>
    )
}

export default E404