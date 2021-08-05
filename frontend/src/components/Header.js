import HeroContent from './HeroContent'
import Navbar from './Navbar'
import { useState } from 'react'

const Header = ({heroImg}) => {
    const [theme, setTheme] = useState((('theme' in localStorage) ? localStorage.theme : (window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'))
    window.document.documentElement.classList.add(theme)
    return (
        <header className="h-3/4s max-w-screen overflow-auto" 
                style={{backgroundImage: `url("${heroImg.default}")`, 
                        backgroundPositionY: '100%',
                        backgroundPositionX: '100%',
                        backgroundSize: 'cover', 
                        overflow: 'hidden'}}>
            <Navbar theme={theme} setTheme={setTheme}/>
            <HeroContent />
        </header>
    )
}

export default Header