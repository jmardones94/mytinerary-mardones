import { Link } from "react-router-dom"

const LogIn = () => {
    return (
        <div className="h-1/2s bg-gray-800 max-w-screen overflow-auto" 
        style={{backgroundImage: `url("${require('../assets/underconstruction.jpg').default}")`, 
                backgroundPositionY: '0%',
                backgroundPositionX: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat', 
                overflow: 'hidden'}}>
            <div className="w-full h-1/2s flex items-end pb-8 justify-center">
                <Link className="bg-red-500 px-10 py-5 rounded-lg text-white font-semibold" to="/">Back to Home</Link>
            </div>
        </div>
    )
}

export default LogIn