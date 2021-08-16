import { Link } from "react-router-dom"

const Form = () => {
  return (
    <main className="flex flex-col gap-5 py-10 text-gray-900 dark:text-gray-100 px-5 md:px-20 transition duration-1000 bg-gray-100 dark:bg-gray-900 flex-grow">
      <h1 className="text-4xl text-center">Welcome!</h1>
      <h2 className="text-center">
        ¿Do you want to add, delete or update a City from our database?
      </h2>
      <section className="flex flex-col md:flex-row justify-center gap-5 items-center">
        <Link
          to="/form/add"
          className="rounded flex justify-center items-center bg-green-500 h-20 w-full md:w-1/4"
        >
          <div className="text-center text-2xl">Add a City</div>
        </Link>
        <Link
          to="/form/update"
          className="rounded flex justify-center items-center bg-yellow-500 h-20 w-full md:w-1/4"
        >
          <div className="text-center text-2xl">Update a City</div>
        </Link>
        <Link
          to="/form/delete"
          className="rounded flex justify-center items-center bg-red-500 h-20 w-full md:w-1/4"
        >
          <div className="text-center text-2xl">Delete a City</div>
        </Link>
      </section>
    </main>
  )
}

export default Form
