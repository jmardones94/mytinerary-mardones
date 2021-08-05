import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'

const Home = () => {
    return(
        <div className="min-h-screen flex flex-col">
            <Header />
            <Main />
            <Footer />
        </div>
    )
}

export default Home