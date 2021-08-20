import React from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { Fragment } from "react"

const FormSelect = ({ selected, setSelected, cities }) => {
  return (
    <div className="w-72 z-50">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="text-gray-900 block truncate">
              {/* {selected ||
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
                  ))} */}
              <p>{selected || "Select a City"}</p>
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
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
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
  )
}

export default FormSelect
