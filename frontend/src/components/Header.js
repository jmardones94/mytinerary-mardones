import Navbar from './Navbar'
import Hero from './Hero'

const Header = ({heroImg}) => {
    return (
        <header>
            <Navbar />
            <Hero heroImg={heroImg} />
        </header>
    )
}

export default Header