const Loading = () => {
  return (
    <div className="px-5 flex items-center justify-center flex-grow md:px-28 py-5 transition duration-1000 dark:bg-gray-900 bg-gray-100">
      <h1 className="flex gap-px text-center text-3xl dark:text-gray-100">
        <span className="animate-bounce">L</span>
        <span className="animate-bounce animation-delay-100">o</span>
        <span className="animate-bounce animation-delay-200">a</span>
        <span className="animate-bounce animation-delay-300">d</span>
        <span className="animate-bounce animation-delay-400">i</span>
        <span className="animate-bounce animation-delay-500">n</span>
        <span className="animate-bounce animation-delay-600">g</span>
        <span className="text-2xl font-black animate-bounce animation-delay-700">
          .
        </span>
        <span className="text-2xl font-black transition animate-bounce animation-delay-800">
          .
        </span>
        <span className="text-2xl font-black transition animate-bounce animation-delay-900">
          .
        </span>
      </h1>
    </div>
  )
}

export default Loading
