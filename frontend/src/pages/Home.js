import Hero from "../components/Hero"
import Carousel from "../components/Carousel"
import { useEffect } from "react"

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const img = require("../assets/hero.png")

  return (
    <main className="flex-grow flex flex-col select-none">
      <Hero heroImg={img} />
      <Carousel />
    </main>
  )
}

export default Home
