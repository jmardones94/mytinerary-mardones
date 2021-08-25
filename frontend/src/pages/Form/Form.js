import { useState } from "react"
import FormAdd from "./FormAdd"
import FormDelete from "./FormDelete"
import FormUpdate from "./FormUpdate"

const Form = () => {
  const [internalSection, setInternalSection] = useState("")
  switch (internalSection) {
    case "add":
      return <FormAdd setSection={setInternalSection} />
    case "delete":
      return <FormDelete setSection={setInternalSection} />
    case "update":
      return <FormUpdate setSection={setInternalSection} />
    default:
      return (
        <section className="flex flex-col gap-4 justify-center text-gray-900 dark:text-gray-100 transition duration-1000 bg-gray-100 dark:bg-gray-900 flex-grow">
          <div className="flex flex-col justify-center gap-2 items-center">
            <div
              onClick={() => setInternalSection("add")}
              className="cursor-pointer rounded flex px-10 py-3 justify-center items-center bg-green-500 w-full md:w-1/2"
            >
              <div className="text-center text-lg lg:text-2xl">Add a City</div>
            </div>
            <div
              onClick={() => setInternalSection("update")}
              className="cursor-pointer rounded flex  px-10 py-3 justify-center items-center bg-yellow-500 w-full md:w-1/2"
            >
              <div className="text-center text-lg md:text-2xl">
                Update a City
              </div>
            </div>
            <div
              onClick={() => setInternalSection("delete")}
              className="cursor-pointer rounded flex  px-10 py-3 justify-center items-center bg-red-500 w-full md:w-1/2"
            >
              <div className="text-center text-lg md:text-2xl">
                Delete a City
              </div>
            </div>
          </div>
        </section>
      )
  }
}

export default Form
