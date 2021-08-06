import { Link } from "react-router-dom"

const SignUp = ({heroImg}) => {
    return (
        <div className="h-screen max-w-screen overflow-auto" 
        style={{backgroundImage: `url("${heroImg.default}")`, 
                backgroundPositionY: '100%',
                backgroundPositionX: '100%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat', 
                overflow: 'hidden'}}>
            <div className="w-full flex justify-center pt-32">
                <Link className="bg-red-500 px-10 py-5 rounded-lg text-white font-semibold" to="/">Back to Home</Link>
            </div>
        </div>
    )
}

export default SignUp