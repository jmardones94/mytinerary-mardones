import { Link } from "react-router-dom"
import { useEffect } from "react"

const E404 = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <main className="py-2 transition duration-1000 max-w-screen relative flex flex-col gap-2 flex-grow items-center justify-center bg-gray-100 dark:bg-gray-900">
      <img
        className="h-1/3s"
        alt="Error 404"
        src={require("../assets/404.png").default}
      ></img>
      <Link
        className="transition duration-1000 bg-black dark:bg-white dark:text-gray-900 px-10 py-2 rounded text-gray-100 font-semibold"
        to="/"
      >
        Back to Home
      </Link>
    </main>
  )
}

export default E404
