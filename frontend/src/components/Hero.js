const Hero = ({heroImg}) => {
    return(
        <div className={`h-1/2s max-w-screen flex justify-start items-center overflow-auto`}
        style={{backgroundImage: `url("${heroImg.default}")`, 
                backgroundPositionY: '100%',
                backgroundPositionX: '100%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'}}>
            <div className="h-100 w-100 md:w-2/5 text-center text-white px-10 md:px-20">
                <h2 className="bg-black px-5 py-6 rounded-lg opacity-40 transform -rotate-12">Find your perfect trip,
                    designed by insiders who know and love their cities!
                </h2>
            </div>
        </div>
    )
}

export default Hero