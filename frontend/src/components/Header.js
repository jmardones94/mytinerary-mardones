import Navbar from './Navbar'

const Header = ({heroImg}) => {
    console.log(heroImg)
    return (
        <header className="h-3/4s max-w-screen overflow-auto" 
                style={{backgroundImage: `url("${heroImg.default}")`, 
                        backgroundPositionY: '100%',
                        backgroundPositionX: '100%',
                        backgroundSize: 'cover', 
                        overflow: 'hidden'}}>
            <Navbar />
        </header>
    )
}

export default Header