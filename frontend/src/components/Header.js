import Navbar from './Navbar'
import bgImg from '../assets/travels.jpg'

const Header = () => {
    // const imgRoute = '../assets/travels.jpg'
    return (
        <header className="h-screen max-w-screen" 
                style={{backgroundImage: `url("${bgImg}")`, 
                        backgroundPositionY: '100%', 
                        backgroundSize: 'cover', 
                        overflow: 'hidden'}}>
            <Navbar />
        </header>
    )
}

export default Header