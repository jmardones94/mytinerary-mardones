const Hero = ({heroImg}) => {
    return(
        <div className={`h-3/4s max-w-screen flex justify-start items-center overflow-auto`}
        style={{backgroundImage: `url("${heroImg.default}")`, 
                backgroundPositionY: '100%',
                backgroundPositionX: '100%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'}}>
            <div className="h-100 w-100 md:w-2/5 text-center text-white px-6 md:px-10">
                <h2 className="px-5 py-6 text-black text-3xl">Find your perfect trip, <br/>
                    designed by insiders who know and love their cities!
                </h2>
            </div>
        </div>
    )
}

export default Hero