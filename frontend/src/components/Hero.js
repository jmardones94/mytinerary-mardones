const Hero = ({heroImg}) => {
    return(
        <div className={`h-1/2 md:h-3/4s max-w-screen dark:bg-gray-300 flex flex-col md:flex-row justify-end items-center pt-10`}>
            <div className="h-100 w-4/5 md:w-3/5 text-center mb-16 md:px-10 order-1 md:order-first">
                <h2 className="text-blue-900 text-lg md:text-3xl">Find your perfect trip,
                    designed by <br/> insiders who know and love their cities!
                </h2>
            </div>
            <div className="w-4/5 md:w-2/5 h-40 md:h-2/5" style={{backgroundImage: `url("${heroImg.default}")`, 
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'}}>
            </div>
            
        </div>
    )
}

export default Hero