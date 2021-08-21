const SearchSection = ({ handleSearch, searchInput }) => {
  return (
    <section className="w-full px-5 md:px-20 flex flex-wrap justify-center ">
      <div className="relative py-10 flex items-center w-5/6 md:w-2/3">
        <svg
          className="dark:text-blue-500 text-red-600 w-5 h-5 absolute left-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
        <input
          className="transition duration-1000 dark:bg-gray-600 dark:text-gray-300 text-red-500 dark:placeholder-gray-300 focus:outline-none focus:ring-1 focus:border-none dark:focus:ring-blue-500 focus:ring-red-500 rounded px-10 py-3 w-full border-2 dark:border-blue-500 border-red-500 placeholder-red-500"
          onChange={handleSearch}
          type="text"
          placeholder="Search a city..."
          ref={searchInput}
        ></input>
      </div>
    </section>
  )
}

export default SearchSection
