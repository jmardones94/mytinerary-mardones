import { Link, NavLink } from "react-router-dom"
import { useState } from "react"
import NavUser from './NavUser'

const Header = () => {
    const [theme, setTheme] = useState(
        ('theme' in localStorage) 
            ? localStorage.theme 
            : (window.matchMedia('(prefers-color-scheme: dark)').matches)
                ? 'dark' 
                : 'light'
    )
    const light_logo = require('../assets/light_logo.png')
    const dark_logo = require('../assets/dark_logo.png')
    window.document.documentElement.classList.add(theme)
    
    const themeClickHandler = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        const root = window.document.documentElement
        
        root.classList.remove(theme)
        setTheme(newTheme)
        root.classList.add(newTheme)
        localStorage.setItem('theme', newTheme)
    }


    return(
    <nav className="transition duration-1000 w-100 min-h-32 py-5 md:h-28 px-5 md:px-20 flex flex-wrap justify-between md:items-center text-gray-900 bg-white dark:text-white dark:bg-black">
        <div className="flex w-full md:w-max text-center md:text-start text-lg">
            <Link className="flex gap-1 items-center" to="/">
                <div className="w-20 h-20" 
                 style={{backgroundImage: `url("${theme === 'dark' ? dark_logo.default : light_logo.default }")`,
                         backgroundSize: 'cover',
                         backgroundPosition: 'center'}}>
                </div>
                <div className="tracking-wider dark:text-white md:text-start font-silt text-3xl">MyTinerary</div>

            </Link>
        </div>
        <div className="w-screen md:w-3/5 flex justify-between mt-3 md:mt-0 z-50">
            <div className="flex gap-4 items-center md:pl-16 md:gap-5 font-semibold md:text-lg">
                <NavLink className="home hover:text-red-500" to="/">Home</NavLink>
                <NavLink className="cities hover:text-red-500" to="/cities">Cities</NavLink>
            </div>
            <div className="md:mr-3 flex items-center gap-3 md:gap-3 relative">
                <span className="z-10 cursor-pointer w-8 h-8 text-yellow-500 hover:text-yellow-600" onClick={themeClickHandler}>
                    {theme === 'dark'
                        ? <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                        : <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
                    }
 
                </span>
                <NavUser />
            
            </div> 
        </div>
    </nav>)
}

export default Header