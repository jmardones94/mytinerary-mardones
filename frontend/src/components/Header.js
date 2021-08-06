import Navbar from './Navbar'
import Hero from './Hero'
import { useState } from 'react'

const Header = ({heroImg, leftHeroContent}) => {
    const [theme, setTheme] = useState(
                                ('theme' in localStorage) 
                                    ? localStorage.theme 
                                    : (window.matchMedia('(prefers-color-scheme: dark)').matches)
                                        ? 'dark' 
                                        : 'light')
    window.document.documentElement.classList.add(theme)
    return (
        <header>
            <Navbar theme={theme} setTheme={setTheme}/>
            <Hero heroImg={heroImg} left={leftHeroContent} />
        </header>
    )
}

export default Header