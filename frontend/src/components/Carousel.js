import { useEffect, useState } from "react"

const Carousel = ({citiesData}) => {
       
    const [index, setIndex] = useState(0)

    useEffect(() => {
        var slider = setTimeout(() => {
            setIndex(((index + 1) % 3))
        }, 5000)
        return () => {
            clearTimeout(slider)
        }
    }, [index])

    return(
        <div className="transition duration-1000 h-carousel bg-white bg-gray-100 dark:bg-gray-800 md:h-screen w-100 flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-4xl mb-8 mt-4 font-semibold">Popular MyTineraries</h2>
            <div className="h-5/6 w-4/5 flex flex-wrap gap-2 p-2 relative">
                <span onClick={() => setIndex((((index - 1) % 3) + 3) % 3 )} className="hover:text-gray-700 cursor-pointer absolute top-1/2 transform transform -translate-y-1/2 -translate-x-8"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span>
                {citiesData[index].map(({src, city}) => {
                    return (<div className="rounded-md w-full md:w-1/3 min-h-1/3 flex items-end flex-grow transform hover:scale-102 transition duration-200" 
                                 key={city}
                                 style={{backgroundImage:`url("${src.default}")`,
                                         backgroundSize: 'cover',
                                         backgroundPosition: 'center'}}>
                                <div className="w-full h-1/5 m-2 rounded-md bg-black opacity-60 flex items-center justify-center"><p className="text-white font-semibold text-lg">{city}</p></div>
                            </div>)
                })}
                <span onClick={() => setIndex(((index + 1) % 3))} className="cursor-pointer absolute top-1/2 -right-6 transform -translate-y-1/2"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg></span>
            </div>
        </div>
    )
}

export default Carousel