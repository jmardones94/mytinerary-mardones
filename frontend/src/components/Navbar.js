import { NavLink } from "react-router-dom"

const Navbar = ({ theme, setTheme }) => {
    const themeClickHandler = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        const root = window.document.documentElement
        
        root.classList.remove(theme)
        setTheme(newTheme)
        root.classList.add(newTheme)
        localStorage.setItem('theme', newTheme)
    }
    return(
    <nav className="w-screen h-32 py-5 md:h-28 px-5 md:px-20 fixed flex flex-wrap justify-between md:items-center text-black bg-gray-300 dark:text-white dark:bg-black bg-opacity-40">
        <div className="text-center md:text-start w-screen md:w-max font-silt text-2xl md:text-5xl"><span className="text-lg">Logo </span>MyTinerary</div>
        <div className="w-screen md:w-3/5 flex justify-between">
            <div className="flex gap-4 md:pl-16 md:gap-5 mt-5">
                <NavLink className="home font-semibold hover:text-yellow-500" exact to="/">Home</NavLink>
                <NavLink className="cities font-semibold hover:text-pink-500" to="/cities">Cities</NavLink>
            </div>
            <div className="mt-5 md:mr-3 flex gap-3 md:gap-5">
                <span>
                    {theme === 'dark'
                        ? <svg onClick={themeClickHandler} className="cursor-pointer w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                        : <svg onClick={themeClickHandler} className="cursor-pointer w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
                    }
 
                </span>

                <span><svg className="cursor-pointer w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg></span>
            </div> 
        </div>
    </nav>)
}

export default Navbar