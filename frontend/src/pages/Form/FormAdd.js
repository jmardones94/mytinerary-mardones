import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FormAdd = () => {
  const [data, setData] = useState({
    name: "",
    country: "",
    src: "",
    currencyCode: "",
  });
  const [addStatus, setAddStatus] = useState(null);
  const [lastCityAdded, setLastCityAdded] = useState("");
  const inputHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddClick = async () => {
    if (!(data.name && data.country && data.src && data.currencyCode)) {
      console.log(data);
      console.log("Falta algo che!");
    } else {
      try {
        const res = await axios.post("http://localhost:4000/api/cities", data);
        console.log(res.data);
        if (res.data.success) {
          setData({
            name: "",
            country: "",
            src: "",
            currencyCode: "",
          });
          setAddStatus(true);
          setLastCityAdded(res.data.city);
        } else {
          throw new Error("Could't load the data.");
        }
      } catch (e) {
        console.error(e);
        setAddStatus(false);
      }
    }
  };
  return (
    <main className="relative flex flex-col justify-center items-center px-5 md:px-20 transition duration-1000 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 flex-grow">
      <div className="flex gap-3 absolute left-2 top-2">
        <Link
          className="bg-green-500 text-gray-100 py-1 px-3 w-20 text-center rounded "
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
          className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-gray-100 w-20 text-center py-1 px-3 rounded "
          to="/form/delete"
        >
          Delete
        </Link>
      </div>
      <h2 className="text-center mb-5 mt-16 md:mt-0">I'm ADD city</h2>
      <div className="flex flex-col gap-3 w-full" style={{ maxWidth: "330px" }}>
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
            value={data.name}
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
            value={data.country}
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
            value={data.src}
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
            value={data.currencyCode}
            maxLength="3"
          ></input>
        </div>
        <button
          className="transform transition-1000 active:scale-95 rounded my-4 py-2 text-gray-100 bg-green-500"
          type="button"
          onClick={handleAddClick}
        >
          Add
        </button>
        {addStatus === false && (
          <p>There was an error adding this city. Please try again later.</p>
        )}
        {addStatus === true && (
          <p className="text-center mb-8 text-md ">
            City added succesfully! check it
            <Link
              className="rounded px-6 mx-2 py-1 text-gray-100 bg-blue-500"
              to={`/itineraries/${lastCityAdded._id}`}
            >
              here
            </Link>
          </p>
        )}
      </div>
    </main>
  );
};

export default FormAdd;
