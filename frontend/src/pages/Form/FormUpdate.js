import { useState, useEffect, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import axios from "axios";
import { Link } from "react-router-dom";

const FormUpdate = () => {
  const [cities, setCities] = useState([]);
  const [updateCount, setUpdateCount] = useState(0);
  const [selectedName, setSelectedName] = useState("");
  const [newData, setNewData] = useState(null);
  const [loading, setLoading] = useState(true);

  const inputHandler = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/api/cities")
      .then((res) => setCities(res.data.response))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [updateCount]);

  const handleUpdateClick = async () => {
    const cityId = cities.find((city) => city.name === selectedName)._id;
    const res = await axios.put(
      `http://localhost:4000/api/city/${cityId}`,
      newData
    );
    if (res.data.success) {
      setUpdateCount(updateCount + 1);
      setSelectedName("");
    } else {
      console.log(res.data);
    }
  };
  const handleSelect = (e) => {
    setSelectedName(e);
    setNewData({ ...cities.find((city) => city.name === e) });
  };

  return (
    <main className="relative py-10 flex justify-center flex-col items-center px-5 md:px-20 transition duration-1000 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 flex-grow">
      <div className="flex gap-3 absolute left-2 top-2">
        <Link
          className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-100 w-20 text-center py-1 px-3 rounded "
          to="/form/add"
        >
          Add
        </Link>
        <Link
          className="bg-yellow-500 text-gray-100 py-1 px-3 w-20 text-center rounded "
          to="/form/update"
        >
          Update
        </Link>
        <Link
          className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-gray-100 w-20 text-center py-1 px-3 rounded "
          to="/form/delete"
        >
          Delete
        </Link>
      </div>
      <h2 className="text-center text-lg mb-3">
        Select the city you want to update
      </h2>
      <div className="w-72 z-50">
        <Listbox value={selectedName} onChange={handleSelect}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-indigo-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="text-gray-900 block truncate">
                {selectedName ||
                  (loading ? (
                    <p className="flex items-center gap-2 justify-between">
                      Cargando...
                      <svg
                        className="inline animate-spin h-3 w-3 rounded-full border-b-2 border-gray-900"
                        viewBox="0 0 50 50"
                      ></svg>
                    </p>
                  ) : (
                    <p>Select a City</p>
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
                              selectedName ? "font-medium" : "font-normal"
                            } block truncate`}
                          >
                            {city.name}
                          </span>
                          {selectedName === city.name ? (
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
      {selectedName && (
        <div className="mt-10 w-full flex flex-col items-center gap-3">
          <div
            className="flex flex-col gap-3 w-full"
            style={{ maxWidth: "400px" }}
          >
            <div className="flex justify-between w-100">
              <label className="font-medium" htmlFor="name">
                City name
              </label>
              <input
                name="name"
                className="px-2 focus:outline-none transform focus:scale-105 rounded text-black border-gray-500 border dark:border-gray-200"
                type="text"
                placeholder="New York"
                onChange={inputHandler}
                value={newData.name}
                required
              ></input>
            </div>
            <div className="flex justify-between w-100">
              <label className="font-medium" htmlFor="country">
                Country
              </label>
              <input
                className="px-2 focus:outline-none transform focus:scale-105 rounded text-black border-gray-500 border dark:border-gray-200"
                name="country"
                type="text"
                placeholder="United States"
                onChange={inputHandler}
                value={newData.country}
              ></input>
            </div>
            <div className="flex justify-between w-100">
              <label className="font-medium" htmlFor="src">
                Photo
              </label>
              <input
                className="px-2 focus:outline-none transform focus:scale-105 rounded text-black border-gray-500 border dark:border-gray-200"
                name="src"
                type="text"
                placeholder="https://example.url.com"
                onChange={inputHandler}
                value={newData.src}
              ></input>
            </div>
            <div className="flex justify-between w-100">
              <label className="font-medium" htmlFor="currencyCode">
                Currency Code
              </label>
              <input
                className="px-2 focus:outline-none transform focus:scale-105 rounded text-black border-gray-500 border dark:border-gray-200"
                name="currencyCode"
                type="text"
                placeholder="USD"
                onChange={inputHandler}
                value={newData.currencyCode}
                maxLength="3"
              ></input>
            </div>
          </div>
          <button
            onClick={handleUpdateClick}
            className="py-2 px-10 font-medium bg-yellow-500 text-gray-100 rounded"
          >
            Update
          </button>
        </div>
      )}
    </main>
  );
};

export default FormUpdate;
