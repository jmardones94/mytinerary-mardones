const Footer = () => {
    const socials = ['Facebook', 'Instagram', 'Twitter']
    return(
        <footer className="w-100 md:h-64 py-5 text-white bg-black flex flex-wrap justify-center md:justify-evenly items-center">
            <ul className="w-1/3 pt-3 md:pt-5 md:w-1/6 md:pl-10 order-1">
                <li className="hover:underline cursor-pointer"><span className="inline-block h-3 w-1 bg-yellow-500 mr-1"></span>Home</li>
                <li className="hover:underline cursor-pointer"><span className="inline-block h-3 w-1 bg-pink-500 mr-1"></span>Cities</li>
                <li className="hover:underline cursor-pointer"><span className="inline-block h-3 w-1 bg-purple-500 mr-1"></span>Sign Up</li>
                <li className="hover:underline cursor-pointer"><span className="inline-block h-3 w-1 bg-red-400 mr-1"></span>Log In</li>
            </ul>
            <div className="w-full md:w-1/3 md:order-2 mt-4 order-last text-center">
                <h2 className="text-5xl mb-5 font-silt">MyTinerary</h2>
                <p>All Rights Reserved</p>
            </div>
            <div className="w-1/3 md:w-1/6 md:px-5 lg:px-10 order-3">
                <h4 className="text-center mb-1 md:mb-5 text-lg font-semibold">Follow Us</h4>
                <ul>
                    {socials.map(social => {
                        let logo = require(`../assets/${social}_logo.png`)
                        return (<li className="flex justify-between my-1" key={social}>
                                    <p className="cursor-pointer hover:underline">{social}</p>
                                    <img className="h-5 w-5 cursor-pointer" 
                                         alt={`${social} Logo`} 
                                         src={logo.default}></img>
                                </li>)
                    })}
                </ul>
            </div>
            
        </footer>
    )
}

export default Footer