import { useState, useEffect, Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import axios from "axios"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)
const Toast = MySwal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})

const FormDelete = () => {
  const [cities, setCities] = useState([])
  const [deleteCount, setDeleteCount] = useState(0)
  const [selected, setSelected] = useState("")
  const [loading, setLoading] = useState(true)
  const [fetchOk, setFetchOk] = useState(null)
  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:4000/api/cities")
      .then((res) => {
        setCities(res.data.response)
        setFetchOk(true)
      })
      .catch((err) => {
        Toast.fire({
          title: err.message,
          icon: "error",
        })
        setFetchOk(false)
      })
      .finally(() => setLoading(false))
  }, [deleteCount])

  const handleDeleteClick = async () => {
    try {
      const cityId = cities.find((city) => city.name === selected)._id
      const res = await axios.delete(`http://localhost:4000/api/city/${cityId}`)
      if (res.data.success) {
        setDeleteCount(deleteCount + 1)
        setSelected("")
        Toast.fire({
          icon: "success",
          title: `${selected} successfully deleted.`,
        })
      } else {
        throw new Error(
          "Our database couldn't handle your request. Please try again later."
        )
      }
    } catch (e) {
      Toast.fire({
        title: e.message,
        icon: "error",
      })
    }
  }

  return (
    <main className="relative flex justify-center flex-col items-center px-5 md:px-20 transition duration-1000 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 flex-grow">
      <div className="flex gap-3 absolute left-2 top-2">
        <Link
          className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-100 w-20 text-center py-1 px-3 rounded "
          to="/form/add"
        >
          Add
        </Link>
        <Link
          className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-100 w-20 text-center py-1 px-3 rounded "
          to="/form/update"
        >
          Update
        </Link>
        <Link
          className="bg-red-500 text-gray-100 py-1 px-3 w-20 text-center rounded "
          to="/form/delete"
        >
          Delete
        </Link>
      </div>
      <h2 className="text-center text-lg mb-3 mt-16 md:mt-0">
        Select the city you want to delete
      </h2>
      <div className="w-72">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="text-gray-900 block truncate">
                {selected ||
                  (loading ? (
                    <p className="flex items-center gap-2 justify-between">
                      Cargando...
                      <svg
                        className="inline animate-spin h-3 w-3 rounded-full border-b-2 border-gray-900"
                        viewBox="0 0 50 50"
                      ></svg>
                    </p>
                  ) : (
                    <p>
                      {fetchOk === false
                        ? "Error loading the cities."
                        : "Select a City"}
                    </p>
                  ))}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {cities
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((city) => (
                    <Listbox.Option
                      key={city._id}
                      className={({ active }) =>
                        `${
                          active
                            ? "text-indigo-900 bg-indigo-300"
                            : "text-gray-900"
                        }
                    cursor-default select-none relative py-2 pl-10 pr-4`
                      }
                      value={city.name}
                    >
                      {({ active }) => (
                        <>
                          <span
                            className={`${
                              selected ? "font-medium" : "font-normal"
                            } block truncate`}
                          >
                            {city.name}
                          </span>
                          {selected === city.name ? (
                            <span
                              className={`${
                                active ? "text-indigo-900" : "text-gray-600"
                              }
                          absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <div>
        <button
          onClick={(e) => {
            selected && handleDeleteClick(e)
          }}
          className={`${
            loading ? "cursor-wait" : !fetchOk && "cursor-not-allowed"
          } w-72 py-2 px-10 font-medium bg-red-500 text-gray-100 rounded my-4`}
        >
          Delete
        </button>
      </div>
    </main>
  )
}

export default FormDelete
