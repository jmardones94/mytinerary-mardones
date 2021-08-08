import { Link } from "react-router-dom"

const Hero = ({heroImg}) => {
    return(
        <div className={`transition duration-1000 h-3/4s md:h-4/5s max-w-screen dark:bg-gray-400 flex flex-col md:flex-row gap-5 justify-end items-center pt-10 md:px-20`}>
            <div className="transition duration-2000 h-full w-4/5 md:w-3/5 flex flex-col justify-center items-center my-10 gap-16 text-center order-1 md:order-first">
                <div className="transition duration-1000 w-100 text-center tracking-wider dark:text-white md:text-start md:w-max font-silt text-3xl md:text-5xl"><Link to="/">MyTinerary</Link></div>

                <h2 className="text-blue-800 text-lg md:text-2xl lg:text-3xl font-semibold tracking-wide">Find your perfect trip, <br/>
                    <span className="transition duration-1000 text-justify tracking-wide text-md md:text-xl lg:text-2xl dark:text-gray-700 text-gray-600 leading-relaxed"> designed by insiders who know and love their cities!</span>
                </h2>
            </div>
            
            <div className="w-4/5 md:w-2/5 h-40 relative">
                <div className="w-1/2 h-full absolute top-0 -left-4 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl md:blur-lg dark:opacity-80 opacity-75 animate-blob"></div>
                <div className="w-1/2 h-full absolute -bottom-5 left-20 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl md:blur-lg dark:opacity-80 opacity-75 animate-blob animation-delay-2000"></div>
                <div className="w-1/2 h-full absolute top-0 -right-4 bg-red-300 rounded-full mix-blend-multiply filter blur-xl md:blur-lg dark:opacity-80 opacity-75 animate-blob animation-delay-4000"></div>
                <div className="w-full h-full absolute z-50" style={{backgroundImage: `url("${heroImg.default}")`, 
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'}}>
                </div>
            </div>
            
        </div>
    )
}

export default Hero