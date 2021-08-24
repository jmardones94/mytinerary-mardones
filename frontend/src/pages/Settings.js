import React, { useState } from "react"
import { Link } from "react-router-dom"
// import { Link } from "react-router-dom"

const Settings = () => {
  const [settingsSection, setSettingsSection] = useState("profile")
  return (
    <main className="flex flex-wrap flex-col md:flex-row gap-5 items-center md:items-start py-10 px-5 md:px-20 text-gray-900 dark:text-gray-100 transition duration-1000 bg-gray-100 dark:bg-gray-900 flex-grow">
      <div className="w-full sm:w-2/3 md:w-1/3 flex items-center flex-col border rounded transition duration-1000 border-black text-gray-900 dark:text-gray-100 dark:border-gray-600 dark:bg-gray-800">
        <button
          type="button"
          onClick={() => setSettingsSection("profile")}
          className="w-full py-3 text-left pl-8"
        >
          Profile
        </button>
        <hr className="w-5/6" />
        <button
          type="button"
          onClick={() => setSettingsSection("mytineraries")}
          className="w-full py-3 text-left pl-8"
        >
          Manage MyTineraries
        </button>
        <hr className="w-5/6" />
        <button
          type="button"
          onClick={() => setSettingsSection("favorites")}
          className="w-full py-3 text-left pl-8"
        >
          Favorites
        </button>
        <hr className="w-5/6" />
        <Link to="/form" className="w-full py-3 text-left pl-8">
          Admin Panel (Hidden soon.)
        </Link>
      </div>
      <div>
        <SettingsSection section={settingsSection} />
      </div>
    </main>
  )
}

const SettingsSection = ({ section }) => {
  switch (section) {
    case "profile":
      return <p>This is the profile section</p>
    case "mytineraries":
      return <p>This is the mytineraries section</p>
    case "favorites":
      return <p>This is the favorites section</p>
    case "security":
      return <p>This is the security section</p>
    default:
      return <p>?</p>
  }
}

export default Settings
