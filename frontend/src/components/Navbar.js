import { NavLink } from "react-router-dom"

const Navbar = () => {
    return(
    <nav className="w-screen h-32 py-5 md:h-28 px-5 md:px-20 fixed flex flex-wrap justify-between md:items-center text-black bg-gray-300 dark:text-white dark:bg-black bg-opacity-40">
        <div className="text-center md:text-start w-screen md:w-max font-silt text-2xl md:text-5xl"><span className="text-lg">Logo </span>MyTinerary</div>
        <div className="w-screen md:w-1/2 flex justify-between">
            <div className="flex gap-2 md:gap-5 mt-5">
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/cities">Cities</NavLink>
            </div>
            <div className="mt-5 mr-10 flex gap-10">
                <p>setTheme</p>
                <p>UserDiv</p>
            </div> 
        </div>
    </nav>)
}

export default Navbar