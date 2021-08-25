import React, { useState } from "react"
// import { Link } from "react-router-dom"
import { connect } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import Form from "./Form/Form"

const Settings = (props) => {
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
        {props.user.admin && (
          <>
            <hr className="w-5/6" />
            <button
              type="button"
              onClick={() => setSettingsSection("admin-panel")}
              className="w-full py-3 text-left pl-8"
            >
              Admin Panel
            </button>
          </>
        )}
      </div>
      <div className="w-full md:w-3/5">
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
    case "admin-panel":
      return <Form />
    default:
      return <p>?</p>
  }
}

const mapStateToProps = (state) => {
  return { user: state.users.user }
}

const mapDispatchToProps = {
  logOut: usersActions.logOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
