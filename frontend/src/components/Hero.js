import { Link } from "react-router-dom";

const Hero = ({ heroImg }) => {
    return (
        <div
            className={`bg-gray-100 dark:bg-gray-900 md:h-4/5s max-w-screen transition duration-1000 flex flex-col md:flex-row gap-2 md:gap-5 justify-end items-center px-5 md:pl-20 md:pr-8`}
        >
            <div className="md:h-full w-full md:w-2/5 gap-8 sm:gap-16 flex flex-col justify-center items-center text-center order-1 md:order-first">
                <div className="w-full text-center flex flex-col gap-5">
                    <h2 className="dark:text-gray-200 text-blue-800 text-lg md:text-2xl lg:text-4xl font-semibold md:tracking-wide lg:tracking-widest font-lemon">
                        Find your perfect trip, <br />
                    </h2>
                    <p className="transition duration-1000 tracking-wide text-md md:text-xl lg:text-2xl dark:text-gray-400 text-gray-600 leading-relaxed">
                        designed by insiders who know and love their cities!
                    </p>
                </div>
                <div className="transition duration-1000 text-gray-600 dark:text-gray-200 flex flex-col flex-wrap md:flex-row gap-2 md:gap-4 items-center justify-center">
                    <p className="text-lg md:text-xl font-semibold tracking-wider">
                        Your dream travel starts
                    </p>
                    <Link
                        className="px-6 py-1 border-2 border-red-600 hover:bg-red-600 rounded text-red-600 hover:text-red-200"
                        to="/cities"
                    >
                        <p className="inline tracking-wider text-md hover:shadow-2xl font-medium">
                            HERE{" "}
                            <svg
                                className="inline transform rotate-45 -translate-y-1 w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </p>
                    </Link>
                </div>
            </div>
            <img
                className="w-3/5"
                alt="Typical travel's kit"
                src={heroImg.default}
            ></img>
        </div>
    );
};

export default Hero;
