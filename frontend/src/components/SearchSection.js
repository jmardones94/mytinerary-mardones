import { SearchIcon } from "@heroicons/react/outline"

const SearchSection = ({ handleSearch, searchInput }) => {
  return (
    <section className="w-full px-5 md:px-20 flex flex-wrap justify-center">
      <div className="relative pt-8 pb-4 flex items-center w-5/6 md:w-2/3">
        <SearchIcon className="dark:text-gray-300 text-blue-900 w-5 h-5 absolute left-3" />
        <input
          autoFocus
          className="transition duration-1000 dark:bg-gray-800 dark:text-gray-300 text-gray-900 dark:placeholder-gray-300 focus:outline-none focus:ring-1 focus:border-none dark:focus:ring-gray-700 rounded px-10 py-3 w-full border dark:border-gray-800 border-blue-900 placeholder-blue-900"
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
