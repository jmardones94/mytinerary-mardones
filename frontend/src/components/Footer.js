import { Link } from "react-router-dom"

const Footer = () => {
    const socials = ['Facebook', 'Instagram', 'Twitter']
    return(
        <footer className="select-none transition duration-1000 w-100 min-h-56 py-5 text-gray-900 dark:text-white bg-white dark:bg-black flex flex-wrap justify-center md:justify-evenly items-center">
            <ul className="w-1/3 pt-3 md:pt-5 md:w-1/6 md:pl-10 order-1">
                <li className="font-medium hover:underline cursor-pointer"><Link to="/"><span className="inline-block h-3 w-1 bg-yellow-500 mr-1"></span>Home</Link></li>
                <li className="font-medium hover:underline cursor-pointer"><Link to="/cities"><span className="inline-block h-3 w-1 bg-pink-500 mr-1"></span>Cities</Link></li>
                <li className="font-medium hover:underline cursor-pointer"><Link to="/signup"><span className="inline-block h-3 w-1 bg-purple-500 mr-1"></span>Sign Up</Link></li>
                <li className="font-medium hover:underline cursor-pointer"><Link to="/login"><span className="inline-block h-3 w-1 bg-red-500 mr-1"></span>Log In</Link></li>
            </ul>
            <div className="w-full md:w-1/3 md:order-2 mt-4 order-last text-center">
                <Link to="/"><h2 className="tracking-wider text-5xl mb-5 font-medium font-silt">MyTinerary</h2></Link>
                <p className="tracking-wide">All Rights Reserved</p>
            </div>
            <div className="w-1/3 md:w-1/6 md:px-5 lg:px-10 order-3">
                <h4 className="text-center mb-1 md:mb-5 text-lg font-semibold tracking-wide">Follow Us</h4>
                <ul>
                    {socials.map(social => {
                        let logo = require(`../assets/${social}_logo.png`)
                        return (<li className="font-semibold flex justify-between my-1" key={social}>
                                    <a href={`https://www.${social.toLowerCase()}.com`} target="_blank" rel="noreferrer" className="cursor-pointer hover:underline">{social}
                                    </a>
                                    <a href={`https://www.${social.toLowerCase()}.com`} target="_blank" rel="noreferrer" className="cursor-pointer hover:underline"><img className="h-5 w-5 cursor-pointer" 
                                         alt={`${social} Logo`} 
                                         src={logo.default}>
                                    </img></a>
                                </li>)
                    })}
                </ul>
            </div>
            
        </footer>
    )
}

export default Footer