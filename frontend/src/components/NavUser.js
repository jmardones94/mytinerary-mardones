import { Menu, Transition } from "@headlessui/react"
import { Link } from "react-router-dom"
import {
  CogIcon,
  LoginIcon,
  LogoutIcon,
  UserAddIcon,
  UserIcon,
} from "@heroicons/react/solid"
import { connect } from "react-redux"
import usersActions from "../redux/actions/usersActions"

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)
const Toast = MySwal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  showCloseButton: true,
})

const NavUser = (props) => {
  const handleLogOut = () => {
    props.logOut()
    Toast.fire({
      icon: "success",
      title: "You've been logged out",
    })
  }
  return (
    <div className="relative text-gray-900 dark:text-white dark:hover:text-gray-700 hover:text-gray-700">
      <Menu>
        <Menu.Button className="flex items-center">
          {props.user ? (
            <div
              className="w-10 h-10 cursor-pointer rounded-full"
              style={{
                backgroundImage: `url("${props.user.photoURL}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          ) : (
            <UserIcon className="cursor-pointer w-10 h-10" />
          )}
        </Menu.Button>
        <Transition
          enter="transition duration-200 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="flex flex-col gap-px absolute text-gray-900 bg-gray-200 dark:bg-gray-800 dark:text-white rounded-lg w-40 -left-32">
            {props.user ? (
              <>
                {" "}
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`w-100 px-3 py-1 rounded-lg ${
                        active && "bg-blue-300 dark:bg-gray-700"
                      }`}
                      to="/settings"
                    >
                      <CogIcon className="w-6 h-6 inline-block mr-5" />
                      <p className="font-medium inline-block text-center">
                        Settings
                      </p>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item onClick={handleLogOut}>
                  {({ active }) => (
                    <div
                      className={`cursor-pointer w-100 px-3 py-1 rounded-lg ${
                        active && "bg-blue-300 dark:bg-gray-700"
                      }`}
                    >
                      <LogoutIcon className="w-6 h-6 inline-block mr-5" />

                      <p className="font-medium inline-block text-center">
                        Log Out
                      </p>
                    </div>
                  )}
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`w-100 px-3 py-1 rounded-lg ${
                        active && "bg-blue-300 dark:bg-gray-700"
                      }`}
                      to="/signup"
                    >
                      <UserAddIcon className="w-6 h-6 inline-block mr-5" />
                      <p className="font-medium inline-block text-center">
                        Sign Up
                      </p>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`w-100 px-3 py-1 rounded-lg ${
                        active && "bg-blue-300 dark:bg-gray-700"
                      }`}
                      to="/login"
                    >
                      <LoginIcon className="w-6 h-6 inline-block mr-5" />
                      <p className="font-medium inline-block text-center">
                        Log In
                      </p>
                    </Link>
                  )}
                </Menu.Item>
              </>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { user: state.users.user }
}

const mapDispatchToProps = {
  logOut: usersActions.logOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(NavUser)
