import { Link, NavLink } from "react-router-dom"
import { useState } from "react"
import NavUser from "./NavUser"
import { MoonIcon, SunIcon } from "@heroicons/react/solid"

const Header = () => {
  const [theme, setTheme] = useState(
    "theme" in localStorage
      ? localStorage.theme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  )
  const light_logo = require("../assets/light_logo.png")
  const dark_logo = require("../assets/dark_logo.png")
  window.document.documentElement.classList.add(theme)

  const themeClickHandler = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    const root = window.document.documentElement

    root.classList.remove(theme)
    setTheme(newTheme)
    root.classList.add(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return (
    <header className="transition duration-1000 w-100 min-h-32 py-5 md:h-28 px-5 md:px-20 flex flex-wrap justify-between md:items-center text-gray-900 bg-gray-100 dark:text-white dark:bg-black">
      <div className="justify-center flex w-full md:w-max text-center md:text-start text-lg">
        <Link className="flex gap-2 items-center" to="/">
          <div
            className="w-16 h-16"
            style={{
              backgroundImage: `url("${
                theme === "dark" ? dark_logo.default : light_logo.default
              }")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="tracking-wider dark:text-white md:text-start font-silt text-3xl">
            MyTinerary
          </div>
        </Link>
      </div>
      <div className="w-screen md:w-3/5 flex justify-between mt-3 md:mt-0 z-50">
        <nav className="flex gap-4 items-center md:pl-16 md:gap-5 font-semibold md:text-lg">
          <NavLink className="home hover:text-red-500" exact to="/">
            Home
          </NavLink>
          <NavLink className="cities hover:text-red-500" to="/cities">
            Cities
          </NavLink>
        </nav>
        <div className="md:mr-3 flex items-center gap-3 md:gap-3 relative">
          <span
            className="z-10 cursor-pointer w-10 h-10 text-yellow-500 hover:text-yellow-600"
            onClick={themeClickHandler}
          >
            {theme === "dark" ? <MoonIcon /> : <SunIcon />}
          </span>
          <NavUser />
        </div>
      </div>
    </header>
  )
}

export default Header
