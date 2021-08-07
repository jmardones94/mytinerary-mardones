import { Link } from 'react-router-dom'

const E404 = () => {
    
    return(
        <div className="h-screen max-w-screen overflow-auto" 
        style={{backgroundImage: `url("${require('../assets/e404.jpg').default}")`, 
                backgroundPositionY: 'center',
                backgroundPositionX: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',}}>
            <div className="w-full flex justify-center pt-10">
                <Link className="bg-b404 px-10 py-5 rounded-lg text-white font-semibold" to="/">Back to Home</Link>
            </div>
        </div>
    )
}

export default E404