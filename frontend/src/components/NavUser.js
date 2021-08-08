import { Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'

const NavUser = () => {
    return(
        <div className="relative">
            <Menu>
                <Menu.Button><svg className="cursor-pointer w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg></Menu.Button>
                <Transition
                    enter="transition duration-200 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Menu.Items className="flex flex-col gap-px absolute text-gray-900 bg-gray-200 dark:bg-gray-900 dark:text-white rounded-lg w-40 -left-32">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                className={`w-100 px-3 py-1 rounded-lg ${active && 'bg-blue-200'}`}
                                to="/signup"
                                >
                                    <svg className="w-6 h-6 inline-block mr-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" /></svg>
                                    <p className="font-medium inline-block text-center">Sign Up</p>
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                className={`w-100 px-3 py-1 rounded-lg ${active && 'bg-blue-200'}`}
                                to="/login"
                                >
                                    <svg className="w-6 h-6 inline-block mr-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" /></svg> 
                                    <p className="font-medium inline-block text-center">Log In</p>
                                </Link>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default NavUser